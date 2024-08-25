using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UxploreAPI.Migrations
{
    /// <inheritdoc />
    public partial class newEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AVG_price",
                table: "Listings",
                newName: "Min_Price");

            migrationBuilder.AddColumn<DateTime>(
                name: "End_Date",
                table: "Listings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<float>(
                name: "Max_Price",
                table: "Listings",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<DateTime>(
                name: "Start_Date",
                table: "Listings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "End_Date",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "Max_Price",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "Start_Date",
                table: "Listings");

            migrationBuilder.RenameColumn(
                name: "Min_Price",
                table: "Listings",
                newName: "AVG_price");
        }
    }
}
