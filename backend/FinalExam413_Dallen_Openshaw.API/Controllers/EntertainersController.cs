using FinalExam413_Dallen_Openshaw.API.Data;
using FinalExam413_Dallen_Openshaw.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalExam413_Dallen_Openshaw.API.Controllers;


    [ApiController]
[Route("api/[controller]")]
public class EntertainersController : ControllerBase
{
    private readonly AppDbContext _context;

    public EntertainersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetEntertainersWithStats()
    {
        var result = await _context.Entertainers
            .Select(e => new
            {
                e.EntertainerID,
                e.EntStageName,
                BookCount = _context.Engagements.Count(en => en.EntertainerID == e.EntertainerID),
                LastBooked = _context.Engagements
                    .Where(en => en.EntertainerID == e.EntertainerID)
                    .OrderByDescending(en => en.EndDate)
                    .Select(en => en.EndDate)
                    .FirstOrDefault()
            })
            .ToListAsync();

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetails(int id)
    {
        var entertainer = await _context.Entertainers.FindAsync(id);
        if (entertainer == null) return NotFound();
        return Ok(entertainer);
    }

    [HttpPost]
    public async Task<IActionResult> AddEntertainer([FromBody] Entertainer entertainer)
    {
        _context.Entertainers.Add(entertainer);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetDetails), new { id = entertainer.EntertainerID }, entertainer);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEntertainer(int id, [FromBody] Entertainer entertainer)
    {
        if (id != entertainer.EntertainerID) return BadRequest();
        _context.Entry(entertainer).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEntertainer(int id)
    {
        var entertainer = await _context.Entertainers.FindAsync(id);
        if (entertainer == null) return NotFound();

        _context.Entertainers.Remove(entertainer);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

