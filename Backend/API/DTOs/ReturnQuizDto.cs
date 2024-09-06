using System;
using API.Entities;

namespace API.DTOs;

public class ReturnQuizDto
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public required List<QuestionDto> Questions { get; set; }
}
