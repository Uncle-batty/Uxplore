using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UxploreAPI.Migrations
{
    /// <inheritdoc />
    public partial class updated_credits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Business_Credits",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    User_id = table.Column<int>(type: "int", nullable: false),
                    Available_Credits = table.Column<int>(type: "int", nullable: false)

                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Business_Credits", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
               name: "Business_Credits");
        }
    }
}
