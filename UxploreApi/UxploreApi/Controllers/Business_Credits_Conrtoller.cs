using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;
using UXplore.Models;
using UxploreAPI.Models;


namespace UxploreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Business_Credits_Conrtoller : ControllerBase
    {

        private readonly DataContext _context;

        public Business_Credits_Conrtoller(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Business_Credits>>> GetCredits(int businessUserId = 0)
        {
            if (businessUserId == 0)
            {
                var creditsList = await _context.business_Credits.ToListAsync();
                return Ok(creditsList); // Wrap the result in Ok()
            }
            else
            {
                var creditsList = await _context.business_Credits.Where(ad => ad.User_id == businessUserId).ToListAsync();
                return Ok(creditsList); // Wrap the result in Ok()
            }
        }

        // GET api/<Business_Adverts_Controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Business_Credits>> GetBusinessCredits(int id)
        {
            var ad = await _context.business_Credits.FindAsync(id);

            if (ad == null)
            {
                return NotFound();
            }

            return Ok(ad);
        }

        [HttpPost]

        public async Task <ActionResult<Business_Credits>> PostCredits(Business_Credits credits)
        {
            _context.business_Credits.Add(credits);
            var businessCredits = await _context.SaveChangesAsync();
            return Ok(businessCredits);
        }


        //[HttpPut]

        //public async Task<ActionResult<Business_Credits>> UpdateCredits(Business_Credits credits)
        //{

        //}




    }
}
