using AutoMapper;
using EcoLife.Api.Dtos;
using EcoLife.Api.DataAccess.UnitOfWork;
using static EcoLife.Api.Helpers.JwtHelper;
using Microsoft.AspNetCore.Mvc;
using EcoLife.Api.Dtos.Response;

namespace EcoLife.Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private IUnitOfWork _uow;
        private JwtService _jwtService;
        private IMapper _mapper;

        public AuthController(IUnitOfWork uow, JwtService jwtService, IMapper mapper)
        {
            _uow = uow;
            _jwtService = jwtService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        async public Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _uow.UserRepository.GetByUser(loginDto.Username);
            if (user == null)
                return BadRequest("Credenciales inválidas");

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                return BadRequest("Credenciales inválidas");

            var jwt = _jwtService.Generate(user);

            var response = _mapper.Map<UserResponseDto>(user);

            response.Token = jwt;

            return Ok(response);
        }
    }
}
