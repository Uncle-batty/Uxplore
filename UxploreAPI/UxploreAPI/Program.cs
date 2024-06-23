using Microsoft.Extensions.Configuration;
using UXplore.Context;
using Microsoft.EntityFrameworkCore;
using UXplore.Models; // Adjust the namespace as necessary
using UxploreAPI.Controllers;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
//Add dbContext, here you can we are using In-memory database.
builder.Services.AddDbContext<UXplore.Context.DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});
// Configure the HTTP request pipeline.
app.UseSwagger();
if (app.Environment.IsDevelopment())
{
    
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapListingEndpoints();

app.MapNotificationsEndpoints();

app.MapCategoryEndpoints();

app.MapCommentsEndpoints();

app.Run();
