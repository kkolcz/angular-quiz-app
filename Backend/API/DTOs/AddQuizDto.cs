using System;
using API.Entities;

namespace API.DTOs;

public class AddQuizDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public List<Question> Questions { get; set; }

}
