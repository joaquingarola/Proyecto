using System.ComponentModel.DataAnnotations;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using EcoLife.Api.Helpers.Email;
using EcoLife.Api.Application;

using MediatR;

namespace EcoLife.Api.Controllers
{
    [Route("api/employees")]
    [Authorize]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IMediator _mediator;
        private readonly IEmailSender _emailSender;

        public EmployeeController(IMediator mediator, IEmailSender emailSender)
        {
            this._mediator = mediator;
            this._emailSender = emailSender;
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
