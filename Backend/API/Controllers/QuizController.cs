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

    [HttpGet("getAllQuiz")]
    public async Task<ActionResult<IEnumerable<Quiz>>> GetAllQuiz()
    {
        var quizzes = await context.Quizzes.Include(x => x.Questions).ToListAsync();


        return Ok(quizzes);
    }
}
