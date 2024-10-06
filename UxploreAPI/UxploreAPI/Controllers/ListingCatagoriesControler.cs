using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using UXplore.Context;
using UXplore.Models;

namespace UXplore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListingCatagoriesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<ListingCatagoriesController> _logger;

        public ListingCatagoriesController(DataContext context, ILogger<ListingCatagoriesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Listing_Catagories>>> GetAllListingCatagories()
        {
            return await _context.Listing_Categories.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Listing_Catagories>> GetListingCatagoriesById(int id)
        {
            var listingCatagory = await _context.Listing_Categories.FindAsync(id);

            if (listingCatagory == null)
            {
                return NotFound();
            }

            return listingCatagory;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateListingCatagories(int id, Listing_Catagories listingCatagories)
        {
            if (id != listingCatagories.Id)
            {
                return BadRequest();
            }

            _context.Entry(listingCatagories).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListingCatagoriesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Listing_Catagories>> CreateListingCatagories([FromBody] ListingCatagoriesDto model)
        {
            var listingCatagory = new Listing_Catagories
            {
                CatagoryId = model.CategoryId,
                Listing_ID = model.ListingId
            };

            _context.Listing_Categories.Add(listingCatagory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetListingCatagoriesById), new { id = listingCatagory.Id }, listingCatagory);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Listing_Catagories>> DeleteListingCatagories(int id)
        {
            var listingCatagory = await _context.Listing_Categories.FindAsync(id);
            if (listingCatagory == null)
            {
                return NotFound();
            }

            _context.Listing_Categories.Remove(listingCatagory);
            await _context.SaveChangesAsync();

            return listingCatagory;
        }

        private bool ListingCatagoriesExists(int id)
        {
            return _context.Listing_Categories.Any(e => e.Id == id);
        }
    }

    public class ListingCatagoriesDto
    {
        public int CategoryId { get; set; }
        public int ListingId { get; set; }
    }
}
