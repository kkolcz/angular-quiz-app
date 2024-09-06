using System;

namespace API.Entities;

public class Answer
{
    public int Id { get; set; }
    public required int QuestionId { get; set; }
    public required string Content { get; set; }
}
