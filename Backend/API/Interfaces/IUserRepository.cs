using System;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<AppUser> Register(AppUser user);
    Task<AppUser> Login(AppUser user);
}
