using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UxploreAPI.Migrations
{
    /// <inheritdoc />
    public partial class listingscats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Listing_Categories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ListingID",
                table: "Listing_Categories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Listing_Categories_CategoryId",
                table: "Listing_Categories",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Listing_Categories_ListingID",
                table: "Listing_Categories",
                column: "ListingID");

            migrationBuilder.AddForeignKey(
                name: "FK_Listing_Categories_Categories_CategoryId",
                table: "Listing_Categories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Listing_Categories_Listings_ListingID",
                table: "Listing_Categories",
                column: "ListingID",
                principalTable: "Listings",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listing_Categories_Categories_CategoryId",
                table: "Listing_Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Listing_Categories_Listings_ListingID",
                table: "Listing_Categories");

            migrationBuilder.DropIndex(
                name: "IX_Listing_Categories_CategoryId",
                table: "Listing_Categories");

            migrationBuilder.DropIndex(
                name: "IX_Listing_Categories_ListingID",
                table: "Listing_Categories");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Listing_Categories");

            migrationBuilder.DropColumn(
                name: "ListingID",
                table: "Listing_Categories");
        }
    }
}
