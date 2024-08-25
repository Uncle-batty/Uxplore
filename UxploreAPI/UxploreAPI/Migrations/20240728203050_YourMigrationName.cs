using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UxploreAPI.Migrations
{
    /// <inheritdoc />
    public partial class YourMigrationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Settings_Users_userId",
                table: "User_Settings");

            migrationBuilder.DropIndex(
                name: "IX_User_Settings_userId",
                table: "User_Settings");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "User_Settings");

            migrationBuilder.CreateIndex(
                name: "IX_User_Settings_User_ID",
                table: "User_Settings",
                column: "User_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Settings_Users_User_ID",
                table: "User_Settings",
                column: "User_ID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Settings_Users_User_ID",
                table: "User_Settings");

            migrationBuilder.DropIndex(
                name: "IX_User_Settings_User_ID",
                table: "User_Settings");

            migrationBuilder.AddColumn<int>(
                name: "userId",
                table: "User_Settings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_User_Settings_userId",
                table: "User_Settings",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Settings_Users_userId",
                table: "User_Settings",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
