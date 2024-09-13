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
    public class User_InteractionsController : ControllerBase
    {
        private readonly DataContext _context;

        public User_InteractionsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/User_Interactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User_Interactions>>> GetUser_Interactions()
        {
            return await _context.User_Interactions.ToListAsync();
        }

        // GET: api/User_Interactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User_Interactions>> GetUser_Interactions(int id)
        {
            var user_Interactions = await _context.User_Interactions.FindAsync(id);

            if (user_Interactions == null)
            {
                return NotFound();
            }

            return user_Interactions;
        }

        // GET: api/User_Interactions/5
        [HttpGet("calender/{userid}")]
        public async Task<IEnumerable<User_Interactions>> GetUser_calender(int userid)
        {
            var user_Interactions = await _context.User_Interactions.Where(x => x.User_ID == userid).ToListAsync();

            //if (user_Interactions == null)
            //{
            //    return NotFound();
            //}

            return user_Interactions;
        }

        // PUT: api/User_Interactions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser_Interactions(int id, User_Interactions user_Interactions)
        {
            if (id != user_Interactions.ID)
            {
                return BadRequest();
            }

            _context.Entry(user_Interactions).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!User_InteractionsExists(id))
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

        // POST: api/User_Interactions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User_Interactions>> PostUser_Interactions(User_Interactions user_Interactions)
        {
            user_Interactions.Interaction_Date = DateTime.Now;
            _context.User_Interactions.Add(user_Interactions);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser_Interactions", new { id = user_Interactions.ID }, user_Interactions);
        }

        // DELETE: api/User_Interactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser_Interactions(int id)
        {
            var user_Interactions = await _context.User_Interactions.FindAsync(id);
            if (user_Interactions == null)
            {
                return NotFound();
            }

            _context.User_Interactions.Remove(user_Interactions);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("type")]
        public async Task<ActionResult<IEnumerable<User_Interactions>>> GetSavedInteractions(string interactionType, int userID, int listingID = -1)
        {
            var query = _context.User_Interactions.AsQueryable();

            if (interactionType != "All")
            {
                query = query.Where(ui => ui.Interaction_Type == interactionType);
            }

            query = query.Where(ui => ui.User_ID == userID);

            if (listingID != -1)
            {
                query = query.Where(ui => ui.Listing_ID == listingID);
            }

            var savedInteractions = await query.ToListAsync();
            return Ok(savedInteractions);
        }



        private bool User_InteractionsExists(int id)
        {
            return _context.User_Interactions.Any(e => e.ID == id);
        }
    }
}
