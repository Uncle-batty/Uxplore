using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UxploreAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatedfk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Interests_Categories_categoryId",
                table: "User_Interests");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Interests_Users_userId",
                table: "User_Interests");

            migrationBuilder.DropIndex(
                name: "IX_User_Interests_categoryId",
                table: "User_Interests");

            migrationBuilder.DropIndex(
                name: "IX_User_Interests_userId",
                table: "User_Interests");

            migrationBuilder.DropColumn(
                name: "categoryId",
                table: "User_Interests");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "User_Interests");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "categoryId",
                table: "User_Interests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "userId",
                table: "User_Interests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_User_Interests_categoryId",
                table: "User_Interests",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Interests_userId",
                table: "User_Interests",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Interests_Categories_categoryId",
                table: "User_Interests",
                column: "categoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Interests_Users_userId",
                table: "User_Interests",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
