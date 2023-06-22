using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EZCake.BusinessObjects;
using EZCake.BusinessObjects.Context;
using FirebaseAdmin.Auth;
using System.Security.Claims;
using EZCake.Utils;
using Microsoft.AspNetCore.Authorization;

namespace EZCake.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly EZCakeContext _context;

        public AccountsController(EZCakeContext context)
        {
            _context = context;
        }

        // GET: api/Accounts
        [HttpGet]
        [Authorize]
        [ClaimRequirement(ClaimTypes.Role, "Admin")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            return await _context.Accounts.ToListAsync();
        }

        // GET: api/Accounts/5
        [HttpGet("id")]
        public async Task<IActionResult> GetAccount(Guid? id, string? email, string? uid)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }

            var account = new Account();

            if (id != null)
            {
                account = await _context.Accounts.FindAsync(id);
            }

            if (email != null)
            {
                account = await _context.Accounts.SingleOrDefaultAsync(a => a.Email == email);
            }

            if (account == null)
            {
                return NotFound();
            }

            await _context.Entry(account).Collection(a => a.ShippingInformations).Query().OrderBy(sif => !sif.Prioritisation).LoadAsync();

            if (uid != null)
            {
                var additionalClaims = new Dictionary<string, object>()
                {
                    {ClaimTypes.Role, account.Role},
                };

                var token = await FirebaseAuth.DefaultInstance.CreateCustomTokenAsync(uid, additionalClaims);

                return Ok(new { token });
            }

            return Ok(account);
        }

        // PUT: api/Accounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(Guid id, Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
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

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            if (_context.Accounts == null)
            {
                return Problem("Entity set 'EZCakeContext.Accounts'  is null.");
            }
            _context.Accounts.Add(account);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AccountExists(account.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(Guid id)
        {
            return (_context.Accounts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
