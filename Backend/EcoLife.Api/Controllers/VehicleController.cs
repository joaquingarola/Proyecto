using System.ComponentModel.DataAnnotations;

using EcoLife.Api.Application;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/vehicles")]
    [Authorize]
    [ApiController]
    public class VehicleController : Controller
    {
        private readonly IMediator _mediator;

        public VehicleController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            return Ok(await _mediator.Send(new GetAllVehiclesQuery()));
        }

        [HttpGet("{vehicleId}")]
        async public Task<IActionResult> GetByIdAsync([FromRoute, Required] GetVehicleByIdQuery query)
        {
            return Ok(await _mediator.Send(query));
        }

        [HttpPost]
        async public Task<IActionResult> PostVehicleAsync([FromBody] CreateVehicleCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{vehicleId}")]
        async public Task<IActionResult> DeleteByIdAsync([FromRoute, Required] DeleteVehicleCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        [HttpPut]
        async public Task<IActionResult> UpdateVehicleAsync([FromBody] UpdateVehicleCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
