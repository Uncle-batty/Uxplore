using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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


        // GET: api/User_Setting/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<User_Setting>> GetUserSettingByUserId(int userId)
        {
            // Find the user setting by userId
            var user_Setting = await _context.User_Settings
                .FirstOrDefaultAsync(s => s.UserId == userId);

            // Check if the setting was found
            if (user_Setting == null)
            {
                return NotFound("Settings not found for the given UserId.");
            }

            return user_Setting;
        }


        // PUT: api/User_Setting/user/{userId}
        [HttpPut("user/{userId}")]
        public async Task<IActionResult> UpdateUserSettingsByUserId(int userId, User_Setting updatedSettings)
        {
            // Retrieve the existing settings for the given userId
            var existingSettings = await _context.User_Settings
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (existingSettings == null)
            {
                return NotFound("Settings not found for the given UserId.");
            }

            // Update the existing settings with the new values
            existingSettings.Push_Notices = updatedSettings.Push_Notices;
            existingSettings.Hide_Account = updatedSettings.Hide_Account;
            existingSettings.Account_Suggestions = updatedSettings.Account_Suggestions;
            existingSettings.Trending_Places = updatedSettings.Trending_Places;
            existingSettings.Reminders = updatedSettings.Reminders;

            _context.Entry(existingSettings).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!User_SettingExists(userId))
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
        [HttpPost]
        public async Task<ActionResult<User_Setting>> PostUser_Setting(User_Setting user_Setting)
        {
            // Ensure the UserId is valid and corresponds to an existing user
            var user = await _context.Users.FindAsync(user_Setting.UserId);
            if (user == null)
            {
                return BadRequest("Invalid UserId");
            }

            _context.User_Settings.Add(user_Setting);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser_Setting), new { id = user_Setting.Id }, user_Setting);
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
