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
        var quiz = await context.RunningQuiz
        .Include(x => x.Answers)
        .FirstOrDefaultAsync(x => x.Id == id);

        if (quiz == null)
        {
            return BadRequest("Quiz not found");
        }

        quiz.EndTime = DateTime.Now;
        await context.SaveChangesAsync();

        // return Ok("Stop quiz successful");
        return Ok(quiz);
    }

    [HttpPost("sendAnswer/{id}")]
    public async Task<ActionResult> SendAnswers(SendAnswersDto sendAnswersDto, int id)
    {
        var quiz = await context.RunningQuiz
            .Include(x => x.Answers)
            .Include(x => x.Quiz) // Zakładając, że masz właściwość nawigacyjną do Quiz
            .ThenInclude(q => q.Questions) // Wczytywanie powiązanych pytań
            .FirstOrDefaultAsync(x => x.Id == id);

        if (quiz == null)
        {
            return BadRequest("Quiz not found");
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


        return Ok("Send answer successful");
    }
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
}

public class StopQuizDto
{
}

public class SendAnswersDto
{
    public required int QuestionId { get; set; }
    public required string Answer { get; set; }
}