using System;

namespace API.DTOs;

public class QuestionDto
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Option1 { get; set; }
    public required string Option2 { get; set; }
    public required string Option3 { get; set; }
    public required string Option4 { get; set; }
    public int? QuizId { get; set; }
    public string CorrectAnswer { get; set; }
}
