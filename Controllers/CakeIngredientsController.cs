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
    public class CakeIngredientsController : ControllerBase
    {
        private readonly EZCakeContext _context;

        public CakeIngredientsController(EZCakeContext context)
        {
            _context = context;
        }

        // GET: api/CakeIngredients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CakeIngredient>>> GetCakeIngredients()
        {
          if (_context.CakeIngredients == null)
          {
              return NotFound();
          }
            return await _context.CakeIngredients.ToListAsync();
        }

        // GET: api/CakeIngredients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CakeIngredient>> GetCakeIngredient(Guid id)
        {
          if (_context.CakeIngredients == null)
          {
              return NotFound();
          }
            var cakeIngredient = await _context.CakeIngredients.FindAsync(id);

            if (cakeIngredient == null)
            {
                return NotFound();
            }

            return cakeIngredient;
        }

        // PUT: api/CakeIngredients/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCakeIngredient(Guid id, CakeIngredient cakeIngredient)
        {
            if (id != cakeIngredient.Id)
            {
                return BadRequest();
            }

            _context.Entry(cakeIngredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CakeIngredientExists(id))
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

        // POST: api/CakeIngredients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CakeIngredient>> PostCakeIngredient(CakeIngredient cakeIngredient)
        {
          if (_context.CakeIngredients == null)
          {
              return Problem("Entity set 'EZCakeContext.CakeIngredients'  is null.");
          }
            _context.CakeIngredients.Add(cakeIngredient);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CakeIngredientExists(cakeIngredient.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCakeIngredient", new { id = cakeIngredient.Id }, cakeIngredient);
        }

        // DELETE: api/CakeIngredients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCakeIngredient(Guid id)
        {
            if (_context.CakeIngredients == null)
            {
                return NotFound();
            }
            var cakeIngredient = await _context.CakeIngredients.FindAsync(id);
            if (cakeIngredient == null)
            {
                return NotFound();
            }

            _context.CakeIngredients.Remove(cakeIngredient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CakeIngredientExists(Guid id)
        {
            return (_context.CakeIngredients?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
