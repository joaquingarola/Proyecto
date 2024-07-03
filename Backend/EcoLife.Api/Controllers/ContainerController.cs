using System.ComponentModel.DataAnnotations;

using EcoLife.Api.Application;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/containers")]
    [Authorize]
    [ApiController]
    public class ContainerController : Controller
    {
        private readonly IMediator _mediator;

        public ContainerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            return Ok(await _mediator.Send(new GetAllContainersQuery()));
        }

        [HttpGet("without-route")]
        async public Task<IActionResult> GetAllWithoutRouteAsync()
        {
            return Ok(await _mediator.Send(new GetAllContainersWithoutRouteQuery()));
        }

        [HttpPost]
        async public Task<IActionResult> PostContainerAsync([FromBody] CreateContainerCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{containerId}")]
        async public Task<IActionResult> DeleteContainerByIdAsync([FromRoute, Required] DeleteContainerCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        [HttpPut]
        async public Task<IActionResult> UpdateContainerAsync([FromBody] UpdateContainerCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
