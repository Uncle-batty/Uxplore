using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;

namespace UXplore.Models
{
    public class Listing
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Hours { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Order { get; set; }
        [Required]
        public int Reserve { get; set; }

        public string Site { get; set; }
        [Required]
        public float AVG_price { get; set; }

        public int UserID { get; set; }

    }


public static class ListingEndpoints
{
	public static void MapListingEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Listing").WithTags(nameof(Listing));

        group.MapGet("/", async (DataContext db) =>
        {
            return await db.Listings.ToListAsync();
        })
        .WithName("GetAllListings")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Listing>, NotFound>> (int id, DataContext db) =>
        {
            return await db.Listings.AsNoTracking()
                .FirstOrDefaultAsync(model => model.ID == id)
                is Listing model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetListingById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, Listing listing, DataContext db) =>
        {
            var affected = await db.Listings
                .Where(model => model.ID == id)
                .ExecuteUpdateAsync(setters => setters
                  
                  .SetProperty(m => m.Name, listing.Name)
                  .SetProperty(m => m.Description, listing.Description)
                  .SetProperty(m => m.Hours, listing.Hours)
                  .SetProperty(m => m.Location, listing.Location)
                  .SetProperty(m => m.Phone, listing.Phone)
                  .SetProperty(m => m.Email, listing.Email)
                  .SetProperty(m => m.Order, listing.Order)
                  .SetProperty(m => m.Reserve, listing.Reserve)
                  .SetProperty(m => m.Site, listing.Site)
                  .SetProperty(m => m.AVG_price, listing.AVG_price)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateListing")
        .WithOpenApi();

        group.MapPost("/", async (Listing listing, DataContext db) =>
        {
            db.Listings.Add(listing);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Listing/{listing.ID}",listing);
        })
        .WithName("CreateListing")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, DataContext db) =>
        {
            var affected = await db.Listings
                .Where(model => model.ID == id)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteListing")
        .WithOpenApi();

           
        }
}}
