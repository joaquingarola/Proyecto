using System.ComponentModel.DataAnnotations;

using EcoLife.Api.Application;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/routes")]
    [Authorize]
    [ApiController]
    public class RouteController : Controller
    {
        private readonly IMediator _mediator;

        public RouteController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpPost]
        async public Task<IActionResult> AddNewRoute([FromBody] CreateRouteCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            return Ok(await _mediator.Send(new GetAllRouteQuery()));
        }

        [HttpGet("{routeId}")]
        async public Task<IActionResult> GetRouteByIdAsync([FromRoute, Required] GetRouteByIdQuery query)
        {
            return Ok(await _mediator.Send(query));
        }

        [HttpPost("update")]
        async public Task<IActionResult> UpdateRouteAsync([FromBody] UpdateRouteCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{routeId}")]
        async public Task<IActionResult> DeleteRouteByIdAsync([FromRoute, Required] DeleteRouteCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }
    }
}
