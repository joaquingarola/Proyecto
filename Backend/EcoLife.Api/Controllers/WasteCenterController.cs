using System.ComponentModel.DataAnnotations;

using EcoLife.Api.Application;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/waste-center")]
    [Authorize]
    [ApiController]

    public class WasteCenterController : Controller
    {
        private readonly IMediator _mediator;

        public WasteCenterController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            return Ok(await _mediator.Send(new GetAllWasteCenterQuery()));
        }

        [HttpPost]
        async public Task<IActionResult> PostWasteCenterAsync([FromBody] CreateWasteCenterCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{wasteCenterId}")]
        async public Task<IActionResult> DeleteWasteCenterByIdAsync([FromRoute, Required] DeleteWasteCenterCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        [HttpPut]
        async public Task<IActionResult> UpdateWasteCenterAsync([FromBody] UpdateWasteCenterCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
