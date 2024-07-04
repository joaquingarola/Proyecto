using EcoLife.Api.Application;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/settings")]
    [Authorize]
    [ApiController]
    public class SettingsController : Controller
    {
        private readonly IMediator _mediator;

        public SettingsController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpPost("change-password")]
        async public Task<IActionResult> ChangePassword([FromBody] ChangePasswordCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
