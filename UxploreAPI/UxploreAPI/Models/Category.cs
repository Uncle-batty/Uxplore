using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;

namespace UXplore.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }

    }


    public static class CategoryEndpoints
    {
        public static void MapCategoryEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/Category").WithTags(nameof(Category));

            group.MapGet("/", async (DataContext db) =>
            {
                return await db.Categories.ToListAsync();
            })
            .WithName("GetAllCategories")
            .WithOpenApi();

            group.MapGet("/{id}", async Task<Results<Ok<Category>, NotFound>> (int id, DataContext db) =>
            {
                return await db.Categories.AsNoTracking()
                    .FirstOrDefaultAsync(model => model.Id == id)
                    is Category model
                        ? TypedResults.Ok(model)
                        : TypedResults.NotFound();
            })
            .WithName("GetCategoryById")
            .WithOpenApi();

            group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, Category category, DataContext db) =>
            {
                var affected = await db.Categories
                    .Where(model => model.Id == id)
                    .ExecuteUpdateAsync(setters => setters
                      .SetProperty(m => m.Id, category.Id)
                      .SetProperty(m => m.Name, category.Name)
                      .SetProperty(m => m.Description, category.Description)
                      );
                return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
            })
            .WithName("UpdateCategory")
            .WithOpenApi();

            group.MapPost("/", async (Category category, DataContext db) =>
            {
                db.Categories.Add(category);
                await db.SaveChangesAsync();
                return TypedResults.Created($"/api/Category/{category.Id}", category);
            })
            .WithName("CreateCategory")
            .WithOpenApi();

            group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, DataContext db) =>
            {
                var affected = await db.Categories
                    .Where(model => model.Id == id)
                    .ExecuteDeleteAsync();
                return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
            })
            .WithName("DeleteCategory")
            .WithOpenApi();
        }
    }

}