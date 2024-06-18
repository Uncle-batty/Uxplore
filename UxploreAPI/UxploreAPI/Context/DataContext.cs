using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.IO;
using UXplore.Models;
using UxploreAPI.Models;


namespace UXplore.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Activity_Calender> Activity_Calendars { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Listing> Listings { get; set; }
        public DbSet<Listing_Catagories> Listing_Categories { get; set; }
        public DbSet<Notifications> Notifications { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Timeslot> Timeslots { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<User_Interactions> User_Interactions { get; set; }
        public DbSet<User_interests> User_Interests { get; set; }
        public DbSet<User_Setting> User_Settings { get; set; }
        public DbSet<ListingImage> ListingImages { get; set; }
        public DbSet<FeelingsListings> feelings { get; set; }

    }
}
