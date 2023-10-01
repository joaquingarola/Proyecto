using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos.Response;
using EcoLife.Api.Dtos;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace EcoLife.Api.Controllers
{
    [Route("api/settings")]
    [Authorize]
    [ApiController]
    public class SettingsController : Controller
    {
        private IUnitOfWork _uow;

        public SettingsController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpPost("change-password")]
        async public Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            var user = await _uow.UserRepository.GetByUser(changePasswordDto.User);
            if (user == null)
                return BadRequest("Hubo un problema al recuperar el usuario. Inicie sesión de nuevo");

            user.Password = BCrypt.Net.BCrypt.HashPassword(changePasswordDto.NewPassword);
            user.IsFirstEntry = false;
            
            await _uow.UserRepository.Update(user);

            return Ok();
        }
    }
}
