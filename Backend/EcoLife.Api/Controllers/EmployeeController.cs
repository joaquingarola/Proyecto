using System.ComponentModel.DataAnnotations;

using EcoLife.Api.Application;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/employees")]
    [Authorize]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IMediator _mediator;

        public EmployeeController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            return Ok(await _mediator.Send(new GetAllEmployeeQuery()));
        }

        [HttpGet("recolectors")]
        async public Task<IActionResult> GetAllRecolectorsAsync()
        {
            return Ok(await _mediator.Send(new GetAllRecolectorsQuery()));
        }

        [HttpGet("{employeeId}")]
        async public Task<IActionResult> GetByIdAsync([FromRoute, Required] GetEmployeeByIdQuery query)
        {
            return Ok(await _mediator.Send(query));
        }

        [HttpPost]
        async public Task<IActionResult> PostEmployeeAsync([FromBody] CreateEmployeeCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpPut]
        async public Task<IActionResult> UpdateEmployeeAsync([FromBody] UpdateEmployeeCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{employeeId}")]
        async public Task<IActionResult> DeleteByIdAsync([FromRoute, Required] DeleteEmployeeCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }
    }
}
