using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;
using UXplore.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using UxploreAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UxploreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Business_Adverts_Controller : ControllerBase
    {

        private readonly DataContext _context;

        public Business_Adverts_Controller(DataContext context)
        {
            _context = context;
        }
        // GET: 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Business_Advert>>> GetAds()
        {
            return await _context.business_Adverts.ToListAsync();
        }

        // GET api/<Business_Adverts_Controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Business_Advert>> GetUser(int id)
        {
            var ad = await _context.business_Adverts.FindAsync(id);

            if (ad == null)
            {
                return NotFound();
            }

            return ad;
        }

        // POST api/<Business_Adverts_Controller>
        [HttpPost]
        public async Task<ActionResult<Business_Advert>> PostAdvert(Business_Advert advert)
        {
            
            _context.business_Adverts.Add(advert);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> deletAdvert(int id)
        {
            var ads = await _context.business_Adverts.FindAsync(id);
            if (ads == null)
            {
                return NotFound();
            }

            _context.business_Adverts.Remove(ads);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> updateAdvert(int id, Business_Advert advert)
        {
            if (id != advert.ID)
            {
                return BadRequest();
            }

            _context.Entry(advert).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            

            return NoContent();
        }



    }
}
