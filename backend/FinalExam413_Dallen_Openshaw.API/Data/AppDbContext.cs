using FinalExam413_Dallen_Openshaw.API.Models;
using Microsoft.EntityFrameworkCore;



namespace FinalExam413_Dallen_Openshaw.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Entertainer> Entertainers { get; set; }
    public DbSet<Engagement> Engagements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Entertainer>().ToTable("Entertainers");
        modelBuilder.Entity<Engagement>().ToTable("Engagements");
    }
}

