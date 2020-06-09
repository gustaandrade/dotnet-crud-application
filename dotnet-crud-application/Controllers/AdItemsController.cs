using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnet_crud_application.Models;

namespace dotnet_crud_application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdItemsController : ControllerBase
    {
        private readonly AdContext _context;

        public AdItemsController(AdContext context)
        {
            _context = context;
        }

        // GET: api/AdItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdItem>>> GetAdItems()
        {
            return await _context.AdItems.ToListAsync();
        }

        // GET: api/AdItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdItem>> GetAdItem(string id)
        {
            var adItem = await _context.AdItems.FindAsync(id);

            if (adItem == null)
            {
                return NotFound();
            }

            return adItem;
        }

        // PUT: api/AdItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdItem(string id, AdItem adItem)
        {
            if (id != adItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(adItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdItemExists(id))
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

        // POST: api/AdItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AdItem>> PostAdItem(AdItem adItem)
        {
            _context.AdItems.Add(adItem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AdItemExists(adItem.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction(nameof(GetAdItem), new { id = adItem.Id }, adItem);
        }

        // DELETE: api/AdItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AdItem>> DeleteAdItem(string id)
        {
            var adItem = await _context.AdItems.FindAsync(id);
            if (adItem == null)
            {
                return NotFound();
            }

            _context.AdItems.Remove(adItem);
            await _context.SaveChangesAsync();

            return adItem;
        }

        private bool AdItemExists(string id)
        {
            return _context.AdItems.Any(e => e.Id == id);
        }
    }
}
