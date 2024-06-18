using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;
using UXplore.Models;
using NumSharp;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Globalization;

namespace UXplore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListingsController : ControllerBase
    {
        private readonly DataContext _context;
        private static Dictionary<string, NDArray> _gloveEmbeddings;
        private static List<FeelingsListings> _feelingsListings; // Store precomputed feelings-listings associations

        public ListingsController(DataContext context)
        {
            _context = context;

            // Load GloVe embeddings once and cache them
            if (_gloveEmbeddings == null)
            {
                string gloveFilePath = "../UxploreAPI/Models/glove.42B.300d.txt";
                _gloveEmbeddings = LoadGloveEmbeddings(gloveFilePath);
            }

            // Initialize _feelingsListings if it's null
            _feelingsListings ??= new List<FeelingsListings>();
        }

        // Helper method to compute and store feelings-listings associations
        private async Task ComputeAndStoreFeelingsListings()
        {
            var feelings = await _context.feelings.Select(f => f.Feeling).ToListAsync();
            var listings = await _context.Listings.ToListAsync();

            foreach (var feeling in feelings)
            {
                var interestEmbedding = GetSentenceEmbedding(feeling, _gloveEmbeddings);
                var descriptionEmbeddings = listings.Select(l => GetSentenceEmbedding(l.Description, _gloveEmbeddings)).ToList();

                // Calculate similarity scores
                var scores = descriptionEmbeddings.AsParallel().Select(descEmb => CosineSimilarity(interestEmbedding, descEmb)).ToList();

                // Combine listings with their scores
                var listingsWithScores = listings.Zip(scores, (listing, score) => new { Listing = listing, Score = score });

                // Order by score in descending order and take top 10
                var top10Listings = listingsWithScores.OrderByDescending(ls => ls.Score).Take(10).ToList();

                // Store in feelings-listings associations
                var existingEntry = _feelingsListings.FirstOrDefault(fl => fl.Feeling.ToLower() == feeling.ToLower());
                if (existingEntry != null)
                {
                    existingEntry.ListingIds = top10Listings.Select(ls => ls.Listing.ID).ToList();
                }
                else
                {
                    _feelingsListings.Add(new FeelingsListings
                    {
                        Feeling = feeling,
                        ListingIds = top10Listings.Select(ls => ls.Listing.ID).ToList()
                    });
                }
            }
        }

        // GET: api/Listings/byCategory/{categoryName}
        [HttpGet("byCategory/{categoryName}")]
        public async Task<ActionResult<IEnumerable<Listing>>> GetListingsByCategory(string categoryName)
        {
            var listings = await _context.Listings
                .Join(_context.Listing_Categories,
                      l => l.ID,
                      lc => lc.Listing_ID,
                      (l, lc) => new { l, lc })
                .Join(_context.Categories,
                      lc => lc.lc.CatagoryId,
                      c => c.Id,
                      (lc, c) => new { lc.l, c })
                .Where(x => x.c.Name == categoryName)
                .Select(x => x.l)
                .ToListAsync();

            if (listings == null || !listings.Any())
            {
                return NotFound();
            }

            return Ok(listings);
        }

        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Listing>>> Search(string term)
        {
            if (string.IsNullOrEmpty(term))
            {
                return BadRequest("Search term cannot be empty");
            }

            string normalizedTerm = term.ToLower().Replace(" ", "");

            var listings = await _context.Listings
                .Where(l => EF.Functions.Like(l.Name.ToLower().Replace(" ", ""), $"%{normalizedTerm}%") ||
                            EF.Functions.Like(l.Description.ToLower().Replace(" ", ""), $"%{normalizedTerm}%") ||
                            EF.Functions.Like(l.Location.ToLower().Replace(" ", ""), $"%{normalizedTerm}%"))
                .ToListAsync();

            return Ok(listings);
        }

        [HttpGet("OneListing")]
        public async Task<ActionResult<IEnumerable<Listing>>> GetOneListing(int listingID)
        {
            var listing = await _context.Listings.FirstOrDefaultAsync(l => l.ID == listingID);

            if (listing != null)
            {
                return Ok(listing);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("game")]
        public ActionResult<Listing> Game(string feeling)
        {
            var feelingsListings = _feelingsListings.FirstOrDefault(fl => fl.Feeling.ToLower() == feeling.ToLower());

            if (feelingsListings == null)
            {
                return NotFound("No listings found for the given feeling.");
            }

            var listingIds = feelingsListings.ListingIds;
            var random = new Random();
            var selectedListingId = listingIds[random.Next(listingIds.Count)];

            var selectedListing = _context.Listings.Find(selectedListingId);

            if (selectedListing == null)
            {
                return NotFound("Selected listing not found.");
            }

            return Ok(selectedListing);
        }

        [HttpPost("computeFeelingsListings")]
        public async Task<IActionResult> ComputeFeelingsListings()
        {
            try
            {
                await ComputeAndStoreFeelingsListings();
                return Ok("Feelings-listings associations computed and stored successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while computing feelings-listings associations: {ex.Message}");
            }
        }

        static Dictionary<string, NDArray> LoadGloveEmbeddings(string filepath)
        {
            var embeddings = new Dictionary<string, NDArray>();

            foreach (var line in System.IO.File.ReadLines(filepath))
            {
                var values = line.Split(' ');
                var word = values[0];
                var vector = np.array(values.Skip(1).Select(v => float.Parse(v, CultureInfo.InvariantCulture)).ToArray());
                embeddings[word] = vector;
            }

            return embeddings;
        }

        static NDArray GetSentenceEmbedding(string sentence, Dictionary<string, NDArray> embeddings, int dim = 50)
        {
            var words = sentence.ToLower().Split(' ');
            var validWords = words.Where(word => embeddings.ContainsKey(word)).Select(word => embeddings[word]).ToList();

            if (!validWords.Any())
                return np.zeros(dim);

            var matrix = np.vstack(validWords.ToArray());
            return np.mean(matrix, axis: 0);
        }

        static float CosineSimilarity(NDArray vecA, NDArray vecB)
        {
            var dotProduct = np.dot(vecA, vecB);
            var normA = np.sqrt(np.sum(np.square(vecA)));
            var normB = np.sqrt(np.sum(np.square(vecB)));
            return dotProduct / (normA * normB);
        }
    }
}
