using System;
using API.Entities;

namespace API.DTOs;

public class AddQuizDto
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public required List<Question> Questions { get; set; }

}
