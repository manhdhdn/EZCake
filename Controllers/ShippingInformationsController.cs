using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EZCake.BusinessObjects;
using EZCake.BusinessObjects.Context;

namespace EZCake.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingInformationsController : ControllerBase
    {
        private readonly EZCakeContext _context;

        public ShippingInformationsController(EZCakeContext context)
        {
            _context = context;
        }

        // GET: api/ShippingInformations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShippingInformation>>> GetShippingInformations(Guid? accountId)
        {
            if (_context.ShippingInformations == null)
            {
                return NotFound();
            }

            var shippingInformation = _context.ShippingInformations.AsQueryable();

            if (accountId != null)
            {
                shippingInformation = shippingInformation.Where(spi => spi.AccountId == accountId);
            }

            return await shippingInformation.ToListAsync();
        }

        // GET: api/ShippingInformations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShippingInformation>> GetShippingInformation(Guid id)
        {
            if (_context.ShippingInformations == null)
            {
                return NotFound();
            }
            var shippingInformation = await _context.ShippingInformations.FindAsync(id);

            if (shippingInformation == null)
            {
                return NotFound();
            }

            return shippingInformation;
        }

        // PUT: api/ShippingInformations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShippingInformation(Guid id, ShippingInformation shippingInformation)
        {
            if (id != shippingInformation.Id)
            {
                return BadRequest();
            }

            _context.Entry(shippingInformation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShippingInformationExists(id))
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

        // POST: api/ShippingInformations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ShippingInformation>> PostShippingInformation(ShippingInformation shippingInformation)
        {
            if (_context.ShippingInformations == null)
            {
                return Problem("Entity set 'EZCakeContext.ShippingInformations'  is null.");
            }
            _context.ShippingInformations.Add(shippingInformation);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ShippingInformationExists(shippingInformation.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetShippingInformation", new { id = shippingInformation.Id }, shippingInformation);
        }

        // DELETE: api/ShippingInformations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShippingInformation(Guid id)
        {
            if (_context.ShippingInformations == null)
            {
                return NotFound();
            }
            var shippingInformation = await _context.ShippingInformations.FindAsync(id);
            if (shippingInformation == null)
            {
                return NotFound();
            }

            _context.ShippingInformations.Remove(shippingInformation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShippingInformationExists(Guid id)
        {
            return (_context.ShippingInformations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
