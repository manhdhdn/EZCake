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
    public class CakesController : ControllerBase
    {
        private readonly EZCakeContext _context;

        public CakesController(EZCakeContext context)
        {
            _context = context;
        }

        // GET: api/Cakes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cake>>> GetCakes(bool? bestSeller)
        {
            if (_context.Cakes == null)
            {
                return NotFound();
            }

            var cakes = _context.Cakes.AsQueryable();

            if (bestSeller == true)
            {
                cakes = cakes.OrderByDescending(c => c.Sold).Take(3);
            }

            return await cakes.ToListAsync();
        }

        // GET: api/Cakes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cake>> GetCake(Guid id)
        {
            if (_context.Cakes == null)
            {
                return NotFound();
            }
            var cake = await _context.Cakes.Include(c => c.CakeIngredients).ThenInclude(ci => ci.Ingredient).Include(c => c.CakeReviews).SingleOrDefaultAsync(c => c.Id == id);

            if (cake == null)
            {
                return NotFound();
            }

            return cake;
        }

        // PUT: api/Cakes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCake(Guid id, Cake cake)
        {
            if (id != cake.Id)
            {
                return BadRequest();
            }

            _context.Entry(cake).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CakeExists(id))
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

        // POST: api/Cakes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cake>> PostCake(Cake cake)
        {
            if (_context.Cakes == null)
            {
                return Problem("Entity set 'EZCakeContext.Cakes'  is null.");
            }
            _context.Cakes.Add(cake);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CakeExists(cake.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCake", new { id = cake.Id }, cake);
        }

        // DELETE: api/Cakes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCake(Guid id)
        {
            if (_context.Cakes == null)
            {
                return NotFound();
            }
            var cake = await _context.Cakes.FindAsync(id);
            if (cake == null)
            {
                return NotFound();
            }

            _context.Cakes.Remove(cake);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CakeExists(Guid id)
        {
            return (_context.Cakes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
