using Microsoft.EntityFrameworkCore;
using System.Data;
using System.IO;
using UXplore.Models;


namespace UXplore.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users => Set<User>();
        public DbSet<Rating> Rateings => Set<Rating>();
        public DbSet<Listing> Listings => Set<Listing>();
        public DbSet<Notifications> Notifications => Set<Notifications>();
        public DbSet<Event> Events => Set<Event>();
        public DbSet<Timeslot> Timeslots => Set<Timeslot>();
    }
}
