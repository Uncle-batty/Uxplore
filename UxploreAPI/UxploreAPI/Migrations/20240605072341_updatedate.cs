using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UxploreAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatedate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Interactions_Users_userId",
                table: "User_Interactions");

            migrationBuilder.DropIndex(
                name: "IX_User_Interactions_userId",
                table: "User_Interactions");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "User_Interactions");

            migrationBuilder.AddColumn<DateOnly>(
                name: "date",
                table: "User_Interactions",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "date",
                table: "User_Interactions");

            migrationBuilder.AddColumn<int>(
                name: "userId",
                table: "User_Interactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_User_Interactions_userId",
                table: "User_Interactions",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Interactions_Users_userId",
                table: "User_Interactions",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
