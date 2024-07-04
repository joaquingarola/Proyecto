using System.ComponentModel.DataAnnotations;

using EcoLife.Api.Application;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/vehicle-center")]
    [Authorize]
    [ApiController]

    public class VehicleCenterController : Controller
    {
        private readonly IMediator _mediator;

        public VehicleCenterController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            return Ok(await _mediator.Send(new GetAllVehicleCenterQuery()));
        }

        [HttpPost]
        async public Task<IActionResult> PostVehicleCenterAsync([FromBody] CreateVehicleCenterCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{vehicleCenterId}")]
        async public Task<IActionResult> DeleteVehicleCenterByIdAsync([FromRoute, Required] DeleteVehicleCenterCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        [HttpPut]
        async public Task<IActionResult> UpdateVehicleCenterAsync([FromBody] UpdateVehicleCenterCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
