using EcoLife.Api.Application.Query.Role;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/roles")]
    [Authorize]
    [ApiController]
    public class RoleController : Controller
    {
        private readonly IMediator _mediator;

        public RoleController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            return Ok(await _mediator.Send(new GetAllRolesQuery()));
        }
    }
}
