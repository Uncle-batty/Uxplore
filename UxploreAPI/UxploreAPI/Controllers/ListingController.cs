using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;
using UXplore.Models; // Assuming Listings, Listing_Categories, and Categories are defined in Models namespace
using System.Linq;
using System.Threading.Tasks;

namespace UXplore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListingsController : ControllerBase
    {
        private readonly DataContext _context;

        public ListingsController(DataContext context)
        {
            _context = context;
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
                .Where(l => EF.Functions.Like(l.Name.ToLower().Replace(" ", ""), $"%{normalizedTerm}%") || EF.Functions.Like(l.Description.ToLower().Replace(" ", ""), $"%{normalizedTerm}%"))
                .ToListAsync();

            return Ok(listings);
        }

    }
}
