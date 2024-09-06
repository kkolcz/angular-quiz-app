using System;

namespace API.Entities;

public class Quiz
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public List<Question> Questions { get; set; }


}
