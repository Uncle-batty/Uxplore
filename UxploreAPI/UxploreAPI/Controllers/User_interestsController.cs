using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;
using UXplore.Models;

namespace UxploreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User_interestsController : ControllerBase
    {
        private readonly DataContext _context;

        public User_interestsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/User_interests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User_interests>>> GetUser_Interests()
        {
            return await _context.User_Interests.ToListAsync();
        }

        // GET: api/User_interests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User_interests>> GetUser_interests(int id)
        {
            var user_interests = await _context.User_Interests.FindAsync(id);

            if (user_interests == null)
            {
                return NotFound();
            }

            return user_interests;
        }

        // PUT: api/User_interests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser_interests(int id, User_interests user_interests)
        {
            if (id != user_interests.Id)
            {
                return BadRequest();
            }

            _context.Entry(user_interests).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!User_interestsExists(id))
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
        public async Task<ActionResult<User_interests>> PostUser_interests([Bind("User_ID,Category_ID")] User_interests user_interests)
        {
            Console.WriteLine($"User_ID: {user_interests.User_ID}, Category_ID: {user_interests.Category_ID}");  // Logging for debugging
            _context.User_Interests.Add(user_interests);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser_interests", new { id = user_interests.Id }, user_interests);
        }



        // DELETE: api/User_interests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser_interests(int id)
        {
            var user_interests = await _context.User_Interests.FindAsync(id);
            if (user_interests == null)
            {
                return NotFound();
            }

            _context.User_Interests.Remove(user_interests);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool User_interestsExists(int id)
        {
            return _context.User_Interests.Any(e => e.Id == id);
        }
    }
}
