using System;

namespace API.Entities;

public class Quiz
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public required List<Question> Questions { get; set; }


}
