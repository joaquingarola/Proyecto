using Microsoft.AspNetCore.Mvc;

using EcoLife.Api.Application;

using MediatR;

namespace EcoLife.Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        async public Task<IActionResult> Login([FromBody] LoginCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpPost("reset-password")]
        async public Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }
    }
}
