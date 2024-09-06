using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class addAnswer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "RunningQuizId",
                table: "Answers",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_RunningQuizId",
                table: "Answers",
                column: "RunningQuizId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_RunningQuiz_RunningQuizId",
                table: "Answers",
                column: "RunningQuizId",
                principalTable: "RunningQuiz",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_RunningQuiz_RunningQuizId",
                table: "Answers");

            migrationBuilder.DropIndex(
                name: "IX_Answers_RunningQuizId",
                table: "Answers");

            migrationBuilder.AlterColumn<int>(
                name: "RunningQuizId",
                table: "Answers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);
        }
    }
}
