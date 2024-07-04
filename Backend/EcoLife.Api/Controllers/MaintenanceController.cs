using System.ComponentModel.DataAnnotations;

using EcoLife.Api.Application;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/maintenances")]
    [Authorize]
    [ApiController]
    public class MaintenanceController : Controller
    {
        private readonly IMediator _mediator;

        public MaintenanceController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            return Ok(await _mediator.Send(new GetAllMaintenancesQuery()));
        }

        [HttpGet("{maintenanceId}")]
        async public Task<IActionResult> GetByIdAsync([FromRoute, Required] GetEmployeeByIdQuery query)
        {
            return Ok(await _mediator.Send(query));
        }

        [HttpPost]
        async public Task<IActionResult> PostMaintenanceAsync([FromBody] CreateMaintenanceCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpPost("complete")]
        async public Task<IActionResult> PostCompleteMaintenanceAsync([FromBody] CompleteMaintenanceCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpPut]
        async public Task<IActionResult> UpdateMaintenanceAsync([FromBody] UpdateMaintenanceCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{maintenanceId}")]
        async public Task<IActionResult> DeleteByIdAsync([FromRoute, Required] DeleteMaintenanceCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }
    }
}
