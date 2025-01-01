using System;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class QuizController(DataContext context) : BaseApiController
{
    [HttpPost("addQuiz")]
    public async Task<ActionResult<Quiz>> AddQuiz(AddQuizDto AddQuizDto)
    {

        var quiz = new Quiz
        {
            Title = AddQuizDto.Title,
            Description = AddQuizDto.Description,
            Category = AddQuizDto.Category,
            Questions = AddQuizDto.Questions
        };

        context.Quizzes.Add(quiz);
        await context.SaveChangesAsync();

        return Ok("Add quiz successful");
    }

    [HttpGet("getAllQuizzes")]
    public async Task<ActionResult<IEnumerable<Quiz>>> GetAllQuiz()
    {
        var quizzes = await context.Quizzes
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
                QuizId = question.QuizId
            }).ToList()
        })
        .ToListAsync();


        return Ok(quizzes);
    }

    [HttpGet("getListQuizzes")]
    public async Task<ActionResult<IEnumerable<Quiz>>> GetListQuiz()
    {
        var quizzes = await context.Quizzes.Select(q => new { q.Id, q.Title, q.Category }).ToListAsync();

        return Ok(quizzes);
    }

    [HttpGet("getAvaliableQuizzes")]
    public async Task<ActionResult<IEnumerable<Quiz>>> GetAvaliableQuiz()
    {
        var quizzes = await context.Quizzes.Select(q => new { q.Id, q.Title }).ToListAsync();

        return Ok(quizzes);
    }

    [HttpGet("getQuiz/{id}")]
    public async Task<ActionResult<Quiz>> GetQuiz(int id)
    {
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
                QuizId = question.QuizId,
                CorrectAnswer = question.Answer // Dodaj to pole
            }).ToList()
        })
        .FirstOrDefaultAsync(x => x.Id == id);

        if (quiz == null)
        {
            return NotFound();
        }

        return Ok(quiz);
    }

    [HttpDelete("deleteQuiz/{id}")]
    public async Task<ActionResult> DeleteQuiz(int id)
    {
        var quiz = await context.Quizzes.FirstOrDefaultAsync(x => x.Id == id);

        if (quiz == null)
        {
            return NotFound();
        }

        context.Quizzes.Remove(quiz);
        await context.SaveChangesAsync();

        return Ok("Delete quiz successful");
    }
}
