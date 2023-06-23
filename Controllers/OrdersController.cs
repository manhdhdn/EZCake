using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EZCake.BusinessObjects;
using EZCake.BusinessObjects.Context;
using EZCake.Utils;

namespace EZCake.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly EZCakeContext _context;

        public OrdersController(EZCakeContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<PagedList<Order>>> GetOrders(Guid? accountId, string? status, string? subStatus, int? pageNumber, int? pageSize)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }

            var orders = _context.Orders.AsQueryable();

            if (accountId != null && status != null && subStatus != null)
            {
                orders = orders.Where(o => o.ShippingInformation!.AccountId == accountId && (o.Status == status || o.Status == subStatus)).OrderBy(o => o.Status == subStatus).ThenBy(o => o.OrderDate);
            }

            if (accountId != null && status != null && subStatus == null)
            {
                orders = orders.Where(o => o.ShippingInformation!.AccountId == accountId && o.Status == status).OrderBy(o => o.OrderDate);
            }

            return await PagedList<Order>.ToPagedListAsync(orders, pageNumber ?? 1, pageSize ?? 6);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(Guid id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            await _context.Entry(order).Reference(o => o.ShippingInformation).LoadAsync();
            await _context.Entry(order).Collection(o => o.OrderDetails).Query().Include(od => od.Cake).LoadAsync();

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(Guid id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            if (_context.Orders == null)
            {
                return Problem("Entity set 'EZCakeContext.Orders'  is null.");
            }
            _context.Orders.Add(order);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrderExists(order.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(Guid id)
        {
            return (_context.Orders?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
