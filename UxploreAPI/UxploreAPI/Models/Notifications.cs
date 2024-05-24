using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;

namespace UXplore.Models
{
    public class Notifications
    {
        [Key] 
        public int Id { get; set; }
        [Required]
        public int User_ID { get; set; }
        [Required]
        public string Heading{ get; set;}
        [Required]
        public string Content { get; set;}
        [Required]
        public DateTime Date{ get; set;}
    }


public static class NotificationsEndpoints
{
	public static void MapNotificationsEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Notifications").WithTags(nameof(Notifications));

        group.MapGet("/", async (DataContext db) =>
        {
            return await db.Notifications.ToListAsync();
        })
        .WithName("GetAllNotifications")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Notifications>, NotFound>> (int id, DataContext db) =>
        {
            return await db.Notifications.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is Notifications model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetNotificationsById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, Notifications notifications, DataContext db) =>
        {
            var affected = await db.Notifications
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.Id, notifications.Id)
                  .SetProperty(m => m.User_ID, notifications.User_ID)
                  .SetProperty(m => m.Heading, notifications.Heading)
                  .SetProperty(m => m.Content, notifications.Content)
                  .SetProperty(m => m.Date, notifications.Date)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateNotifications")
        .WithOpenApi();

        group.MapPost("/", async (Notifications notifications, DataContext db) =>
        {
            db.Notifications.Add(notifications);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Notifications/{notifications.Id}",notifications);
        })
        .WithName("CreateNotifications")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, DataContext db) =>
        {
            var affected = await db.Notifications
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteNotifications")
        .WithOpenApi();
    }
}}
