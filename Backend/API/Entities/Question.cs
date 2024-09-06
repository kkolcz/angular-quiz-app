using System;

namespace API.Entities;

public class Question
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Option1 { get; set; }
    public string Option2 { get; set; }
    public string Option3 { get; set; }
    public string Option4 { get; set; }
    public string Answer { get; set; }
    public int QuizId { get; set; }
}
