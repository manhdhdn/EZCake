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
    public class CakeReviewsController : ControllerBase
    {
        private readonly EZCakeContext _context;

        public CakeReviewsController(EZCakeContext context)
        {
            _context = context;
        }

        // GET: api/CakeReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CakeReview>>> GetCakeReviews()
        {
          if (_context.CakeReviews == null)
          {
              return NotFound();
          }
            return await _context.CakeReviews.ToListAsync();
        }

        // GET: api/CakeReviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CakeReview>> GetCakeReview(Guid id)
        {
          if (_context.CakeReviews == null)
          {
              return NotFound();
          }
            var cakeReview = await _context.CakeReviews.FindAsync(id);

            if (cakeReview == null)
            {
                return NotFound();
            }

            return cakeReview;
        }

        // PUT: api/CakeReviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCakeReview(Guid id, CakeReview cakeReview)
        {
            if (id != cakeReview.Id)
            {
                return BadRequest();
            }

            _context.Entry(cakeReview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CakeReviewExists(id))
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

        // POST: api/CakeReviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CakeReview>> PostCakeReview(CakeReview cakeReview)
        {
          if (_context.CakeReviews == null)
          {
              return Problem("Entity set 'EZCakeContext.CakeReviews'  is null.");
          }
            _context.CakeReviews.Add(cakeReview);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CakeReviewExists(cakeReview.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCakeReview", new { id = cakeReview.Id }, cakeReview);
        }

        // DELETE: api/CakeReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCakeReview(Guid id)
        {
            if (_context.CakeReviews == null)
            {
                return NotFound();
            }
            var cakeReview = await _context.CakeReviews.FindAsync(id);
            if (cakeReview == null)
            {
                return NotFound();
            }

            _context.CakeReviews.Remove(cakeReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CakeReviewExists(Guid id)
        {
            return (_context.CakeReviews?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
