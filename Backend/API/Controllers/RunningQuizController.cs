using System;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class RunningQuizController(DataContext context) : BaseApiController
{
    [HttpPost("startQuiz/{id}")]
    public async Task<ActionResult> StartQuiz(StartQuizDto startQuizDto, int id)
    {

        var runningQuiz = new RunningQuiz
        {
            QuizId = id,
            UserId = startQuizDto.UserId,
            Username = startQuizDto.Username,
            StartTime = DateTime.Now
        };

        await context.RunningQuiz.AddAsync(runningQuiz);
        await context.SaveChangesAsync();

        var quiz = await context.Quizzes
        .Include(x => x.Questions)
        .Select(q => new ReturnQuizDto
        {
            Id = q.Id,
            Title = q.Title,
            Description = q.Description,
            Category = q.Category,
            Questions = q.Questions.Select(question => new QuestionDto
            {
                Id = question.Id,
                Title = question.Title,
                Option1 = question.Option1,
                Option2 = question.Option2,
                Option3 = question.Option3,
                Option4 = question.Option4,
            }).ToList()
        })
        .FirstOrDefaultAsync(x => x.Id == id);

        if (quiz == null)
        {
            return BadRequest("Quiz not found");
        }

        var response = new StartQuizResponseDto
        {
            Message = "Start quiz successful",
            RunningQuizId = runningQuiz.Id,
            Quiz = quiz,
        };

        return Ok(response);
    }

    [HttpPost("stopQuiz/{id}")]
    public async Task<ActionResult> StopQuiz(int id)
    {
        // var quiz = await context.RunningQuiz
        // .Include(x => x.Answers)
        // .FirstOrDefaultAsync(x => x.Id == id);

        var quiz = await context.RunningQuiz
    .Include(x => x.Answers)
    .Include(x => x.Quiz)
    .ThenInclude(q => q.Questions)
    .FirstOrDefaultAsync(x => x.Id == id);

        if (quiz == null)
        {
            return BadRequest("Quiz not found");
        }

        quiz.EndTime = DateTime.Now;
        await context.SaveChangesAsync();


        var correctAnswers = 0;
        var wrongAnswers = 0;

        foreach (var answer in quiz.Answers)
        {
            var question = quiz.Quiz.Questions.FirstOrDefault(x => x.Id == answer.QuestionId);

            if (question.Answer == answer.Content)
            {
                correctAnswers++;
            }
            else
            {
                wrongAnswers++;
            }
        }

        var response = new ResultsDto
        {
            Message = "Stop quiz successful",
            QuizId = quiz.QuizId,
            RunningQuizId = quiz.Id,
            CorrectAnswers = correctAnswers,
            WrongAnswers = wrongAnswers,
            TotalQuestions = quiz.Quiz.Questions.Count,
            Username = quiz.Username,
        };



        return Ok(response);
        // return Ok(quiz);
    }

    [HttpPost("sendAnswer/{id}")]
    public async Task<ActionResult> SendAnswers(SendAnswersDto sendAnswersDto, int id)
    {
        var quiz = await context.RunningQuiz
            .Include(x => x.Answers)
            .Include(x => x.Quiz)
            .ThenInclude(q => q.Questions)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (quiz == null)
        {
            return BadRequest("Quiz not found");
        }

        if (quiz.EndTime != null)
        {
            return BadRequest("Quiz already ended");
        }

        if (quiz.Answers.Any(x => x.QuestionId == sendAnswersDto.QuestionId))
        {
            return BadRequest("Answer already sent");
        }

        if (quiz.Answers.Count == quiz.Quiz.Questions.Count)
        {
            return BadRequest("All answers already sent");
        }

        if (!quiz.Quiz.Questions.Any(x => x.Id == sendAnswersDto.QuestionId))
        {
            return BadRequest("Question not found");
        }


        quiz.Answers.Add(new Answer
        {
            QuestionId = sendAnswersDto.QuestionId,
            Content = sendAnswersDto.Answer
        });


        await context.SaveChangesAsync();


        return Ok(new { message = "Send answer successful" });
    }

    [HttpGet("getResults/{id}")]
    public async Task<ActionResult> GetResults(int id)
    {
        var quiz = await context.RunningQuiz
            .Include(x => x.Answers)
            .Include(x => x.Quiz)
            .ThenInclude(q => q.Questions)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (quiz == null)
        {
            return BadRequest("Quiz not found");
        }

        if (quiz.EndTime == null)
        {
            return BadRequest("Quiz not ended");
        }

        var correctAnswers = 0;
        var wrongAnswers = 0;

        foreach (var answer in quiz.Answers)
        {
            var question = quiz.Quiz.Questions.FirstOrDefault(x => x.Id == answer.QuestionId);

            if (question.Answer == answer.Content)
            {
                correctAnswers++;
            }
            else
            {
                wrongAnswers++;
            }
        }

        var response = new ResultsDto
        {
            QuizId = quiz.QuizId,
            RunningQuizId = quiz.Id,
            CorrectAnswers = correctAnswers,
            WrongAnswers = wrongAnswers,
            TotalQuestions = quiz.Quiz.Questions.Count,
            Username = quiz.Username,
        };

        return Ok(response);
    }



[HttpGet("getAllResults")]
public async Task<ActionResult> GetAllResults()
{
    var quizzes = await context.RunningQuiz
        .Include(x => x.Answers)
        .Include(x => x.Quiz)
        .ThenInclude(q => q.Questions)
        .Where(x => x.EndTime != null)
        .ToListAsync();

    if(!quizzes.Any())
    {
        return Ok(new List<ResultsDto>());
    }

    var results = new List<ResultsDto>();

    foreach(var quiz in quizzes)
    {
        var correctAnswers = 0;
        var wrongAnswers = 0;

        foreach (var answer in quiz.Answers)
        {
            var question = quiz.Quiz?.Questions?.FirstOrDefault(x => x.Id == answer.QuestionId);
            if (question != null && answer.Content != null && question.Answer == answer.Content)
            {
                correctAnswers++;
            }
            else
            {
                wrongAnswers++;
            }
        }

        var solvingTime = quiz.EndTime.Value - quiz.StartTime;

        results.Add(new ResultsDto
        {
            QuizId = quiz.QuizId,
            RunningQuizId = quiz.Id,
            CorrectAnswers = correctAnswers,
            WrongAnswers = wrongAnswers,
            TotalQuestions = quiz.Quiz?.Questions?.Count ?? 0,
            Username = quiz.Username ?? "Anonymous",
            Category = quiz.Quiz?.Category ?? "Unknown",
            SolvingTime = solvingTime,
            CompletionDate = quiz.EndTime.Value
        });
    }

    return Ok(results);
}


}

internal class ResultsDto
{
    public string Message { get; internal set; }
    public string Username { get; internal set; }
    public int QuizId { get; set; }
    public int RunningQuizId { get; set; }
    public int CorrectAnswers { get; set; }
    public int WrongAnswers { get; set; }
    public int TotalQuestions { get; set; }
    public string Category { get; set; }
    public TimeSpan SolvingTime { get; set; }
    public DateTime CompletionDate { get; set; }
}

internal class StartQuizResponseDto
{
    public required string Message { get; set; }
    public required int RunningQuizId { get; set; }
    public required ReturnQuizDto Quiz { get; set; }
}

public class StartQuizDto
{
    public required int UserId { get; set; }
    public required string Username { get; set; }
}

public class StopQuizDto
{
}

public class SendAnswersDto
{
    public required int QuestionId { get; set; }
    public required string Answer { get; set; }
}