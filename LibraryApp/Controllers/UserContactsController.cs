using LibraryApp.Data;
using LibraryApp.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserContactsController : ControllerBase
    {
        private readonly LibraryAppContext _context;

        public UserContactsController(LibraryAppContext context)
        {
            _context = context;
        }

        // GET: api/UserContacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserContact>>> GetUserContact()
        {
            return await _context.UserContact.ToListAsync();
        }

        [Route("[action]/{userId}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserContact>>> ByUserId(int userId)
        {
            return await _context.UserContact.Where(uc => uc.UserId == userId).ToListAsync();
        }

        // GET: api/UserContacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserContact>> GetUserContact(int id)
        {
            var userContact = await _context.UserContact.FindAsync(id);

            if (userContact == null)
            {
                return NotFound();
            }

            return userContact;
        }

        // PUT: api/UserContacts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserContact(int id, UserContact userContact)
        {
            if (id != userContact.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userContact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserContactExists(id))
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

        // POST: api/UserContacts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UserContact>> PostUserContact(UserContact userContact)
        {
            _context.UserContact.Add(userContact);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserContactExists(userContact.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserContact", new { id = userContact.UserId }, userContact);
        }

        // DELETE: api/UserContacts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserContact>> DeleteUserContact(int id)
        {
            var userContact = await _context.UserContact.FindAsync(id);
            if (userContact == null)
            {
                return NotFound();
            }

            _context.UserContact.Remove(userContact);
            await _context.SaveChangesAsync();

            return userContact;
        }

        private bool UserContactExists(int id)
        {
            return _context.UserContact.Any(e => e.UserId == id);
        }
    }
}
