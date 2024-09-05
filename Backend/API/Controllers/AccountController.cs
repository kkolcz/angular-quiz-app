using System;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseApiController
{

    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
    {
        if (registerDto.Username == "" || registerDto.Password == "")
        {
            return BadRequest("Invalid request");
        }

        return Ok("Register successful");
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUser>> Login(LoginDto registerDto)
    {
        if (registerDto.Username == "" || registerDto.Password == "")
        {
            return BadRequest("Invalid request");
        }

        return Ok("Login successful");
    }

}
