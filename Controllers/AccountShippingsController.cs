using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EZCake.BusinessObjects;
using EZCake.BusinessObjects.Context;

namespace EZCake.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountShippingsController : ControllerBase
    {
        private readonly EZCakeContext _context;

        public AccountShippingsController(EZCakeContext context)
        {
            _context = context;
        }

        // GET: api/AccountShippings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountShipping>>> GetAccountShippings()
        {
          if (_context.AccountShippings == null)
          {
              return NotFound();
          }
            return await _context.AccountShippings.ToListAsync();
        }

        // GET: api/AccountShippings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AccountShipping>> GetAccountShipping(Guid id)
        {
          if (_context.AccountShippings == null)
          {
              return NotFound();
          }
            var accountShipping = await _context.AccountShippings.FindAsync(id);

            if (accountShipping == null)
            {
                return NotFound();
            }

            return accountShipping;
        }

        // PUT: api/AccountShippings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccountShipping(Guid id, AccountShipping accountShipping)
        {
            if (id != accountShipping.Id)
            {
                return BadRequest();
            }

            _context.Entry(accountShipping).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountShippingExists(id))
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

        // POST: api/AccountShippings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AccountShipping>> PostAccountShipping(AccountShipping accountShipping)
        {
          if (_context.AccountShippings == null)
          {
              return Problem("Entity set 'EZCakeContext.AccountShippings'  is null.");
          }
            _context.AccountShippings.Add(accountShipping);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AccountShippingExists(accountShipping.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAccountShipping", new { id = accountShipping.Id }, accountShipping);
        }

        // DELETE: api/AccountShippings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountShipping(Guid id)
        {
            if (_context.AccountShippings == null)
            {
                return NotFound();
            }
            var accountShipping = await _context.AccountShippings.FindAsync(id);
            if (accountShipping == null)
            {
                return NotFound();
            }

            _context.AccountShippings.Remove(accountShipping);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountShippingExists(Guid id)
        {
            return (_context.AccountShippings?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
