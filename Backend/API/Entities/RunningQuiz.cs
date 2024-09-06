using System;

namespace API.Entities;

public class RunningQuiz
{
    public int Id { get; set; }
    public int QuizId { get; set; }
    public int UserId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public List<Answer> Answers { get; set; } = new List<Answer>();
    public Quiz Quiz { get; set; }

}
