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
    public class IngredientTypesController : ControllerBase
    {
        private readonly EZCakeContext _context;

        public IngredientTypesController(EZCakeContext context)
        {
            _context = context;
        }

        // GET: api/IngredientTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IngredientType>>> GetIngredientTypes()
        {
          if (_context.IngredientTypes == null)
          {
              return NotFound();
          }
            return await _context.IngredientTypes.ToListAsync();
        }

        // GET: api/IngredientTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IngredientType>> GetIngredientType(Guid id)
        {
          if (_context.IngredientTypes == null)
          {
              return NotFound();
          }
            var ingredientType = await _context.IngredientTypes.FindAsync(id);

            if (ingredientType == null)
            {
                return NotFound();
            }

            await _context.Entry(ingredientType).Collection(i => i.Ingredients).LoadAsync();

            return ingredientType;
        }

        // PUT: api/IngredientTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIngredientType(Guid id, IngredientType ingredientType)
        {
            if (id != ingredientType.Id)
            {
                return BadRequest();
            }

            _context.Entry(ingredientType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientTypeExists(id))
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

        // POST: api/IngredientTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IngredientType>> PostIngredientType(IngredientType ingredientType)
        {
          if (_context.IngredientTypes == null)
          {
              return Problem("Entity set 'EZCakeContext.IngredientTypes'  is null.");
          }
            _context.IngredientTypes.Add(ingredientType);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (IngredientTypeExists(ingredientType.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetIngredientType", new { id = ingredientType.Id }, ingredientType);
        }

        // DELETE: api/IngredientTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIngredientType(Guid id)
        {
            if (_context.IngredientTypes == null)
            {
                return NotFound();
            }
            var ingredientType = await _context.IngredientTypes.FindAsync(id);
            if (ingredientType == null)
            {
                return NotFound();
            }

            _context.IngredientTypes.Remove(ingredientType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IngredientTypeExists(Guid id)
        {
            return (_context.IngredientTypes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
