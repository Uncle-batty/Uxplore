using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UxploreAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddInteractionDateToUserInteractions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "date",
                table: "User_Interactions",
                newName: "Interaction_Date");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Interaction_Date",
                table: "User_Interactions",
                newName: "date");
        }
    }
}
