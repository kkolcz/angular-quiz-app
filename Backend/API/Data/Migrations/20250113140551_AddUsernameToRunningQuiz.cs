using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUsernameToRunningQuiz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "RunningQuiz",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Answer",
                table: "Question",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RunningQuiz_QuizId",
                table: "RunningQuiz",
                column: "QuizId");

            migrationBuilder.AddForeignKey(
                name: "FK_RunningQuiz_Quizzes_QuizId",
                table: "RunningQuiz",
                column: "QuizId",
                principalTable: "Quizzes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RunningQuiz_Quizzes_QuizId",
                table: "RunningQuiz");

            migrationBuilder.DropIndex(
                name: "IX_RunningQuiz_QuizId",
                table: "RunningQuiz");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "RunningQuiz");

            migrationBuilder.AlterColumn<string>(
                name: "Answer",
                table: "Question",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }
    }
}
