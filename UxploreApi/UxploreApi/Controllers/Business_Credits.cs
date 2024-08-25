using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;
using UXplore.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using UxploreAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.Web;
using System.Net.Http.Headers;
using System.Text.Json;

namespace UxploreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Business_Credits : ControllerBase
    {

        private readonly DataContext _context;

        public Business_Credits(DataContext context)
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



    }
}
