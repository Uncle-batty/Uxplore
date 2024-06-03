using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;

namespace UXplore.Models
{
    public class Comments
    {
        [Key]   
        public int Id { get; set; }
        public int Event_ID { get; set; }
        public int Listing_ID { get; set; }
        [Required]
        public string Comment { get; set; }
    }


public static class CommentsEndpoints
{
	public static void MapCommentsEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Comments").WithTags(nameof(Comments));

        group.MapGet("/", async (DataContext db) =>
        {
            return await db.Comments.ToListAsync();
        })
        .WithName("GetAllComments")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Comments>, NotFound>> (int id, DataContext db) =>
        {
            return await db.Comments.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is Comments model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetCommentsById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, Comments comments, DataContext db) =>
        {
            var affected = await db.Comments
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.Id, comments.Id)
                  .SetProperty(m => m.Event_ID, comments.Event_ID)
                  .SetProperty(m => m.Listing_ID, comments.Listing_ID)
                  .SetProperty(m => m.Comment, comments.Comment)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateComments")
        .WithOpenApi();

        group.MapPost("/", async (Comments comments, DataContext db) =>
        {
            db.Comments.Add(comments);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Comments/{comments.Id}",comments);
        })
        .WithName("CreateComments")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, DataContext db) =>
        {
            var affected = await db.Comments
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteComments")
        .WithOpenApi();
    }
}}
