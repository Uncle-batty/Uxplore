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
    public class User_SettingController : ControllerBase
    {
        private readonly DataContext _context;

        public User_SettingController(DataContext context)
        {
            _context = context;
        }

        // GET: api/User_Setting
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User_Setting>>> GetUser_Settings()
        {
            return await _context.User_Settings.ToListAsync();
        }

        // GET: api/User_Setting/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User_Setting>> GetUser_Setting(int id)
        {
            var user_Setting = await _context.User_Settings.FindAsync(id);

            if (user_Setting == null)
            {
                return NotFound();
            }

            return user_Setting;
        }

        // PUT: api/User_Setting/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser_Setting(int id, User_Setting user_Setting)
        {
            if (id != user_Setting.Id)
            {
                return BadRequest();
            }

            _context.Entry(user_Setting).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!User_SettingExists(id))
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

        // POST: api/User_Setting
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User_Setting>> PostUser_Setting(User_Setting user_Setting)
        {
            _context.User_Settings.Add(user_Setting);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser_Setting", new { id = user_Setting.Id }, user_Setting);
        }

        // DELETE: api/User_Setting/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser_Setting(int id)
        {
            var user_Setting = await _context.User_Settings.FindAsync(id);
            if (user_Setting == null)
            {
                return NotFound();
            }

            _context.User_Settings.Remove(user_Setting);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool User_SettingExists(int id)
        {
            return _context.User_Settings.Any(e => e.Id == id);
        }
    }
}
