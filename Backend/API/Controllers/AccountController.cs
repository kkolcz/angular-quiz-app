using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context) : BaseApiController
{


    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
    {
        if (registerDto.Username == "" || registerDto.Password == "")
        {
            return BadRequest("Invalid request");
        }

        var user = new AppUser
        {
            Username = registerDto.Username,
            Password = registerDto.Password
        };

        context.Users.Add(user);

        return Ok("Register successful");
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
    {
        if (loginDto.Username == "" || loginDto.Password == "")
        {
            return BadRequest("Invalid request");
        }

        var user = await context.Users.FirstOrDefaultAsync(x => x.Username == loginDto.Username);

        if (user == null)
        {
            return Unauthorized("Invalid username");
        }

        if (user.Password != loginDto.Password)
        {
            return Unauthorized("Invalid password");
        }

        var returnUser = new UserDto
        {
            Username = user.Username,
            Password = user.Password
        };

        return Ok(returnUser);
    }

}
