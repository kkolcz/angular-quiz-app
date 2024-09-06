namespace API.Controllers;

public class AnswerDto
{
    public required string QuizId { get; set; }
    public required string QuestionId { get; set; }
    public required string Answer { get; set; }
    public required string UserId { get; set; }

}