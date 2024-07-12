﻿using System.ComponentModel.DataAnnotations;

using EcoLife.Api.Application;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/recolections")]
    [Authorize]
    [ApiController]
    public class RecolectionController : Controller
    {
        private readonly IMediator _mediator;

        public RecolectionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            return Ok(await _mediator.Send(new GetAllRecolectionQuery()));
        }

        [HttpGet("{recolectionId}")]
        async public Task<IActionResult> GetByIdAsync([FromRoute, Required] GetRecolectionByIdQuery query)
        {
            return Ok(await _mediator.Send(query));
        }

        [HttpPost]
        async public Task<IActionResult> PostAsync([FromBody] CreateRecolectionCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{recolectionId}")]
        async public Task<IActionResult> DeleteByIdAsync([FromRoute, Required] DeleteRecolectionCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        [HttpPost("update")]
        async public Task<IActionResult> UpdateAsync([FromBody] UpdateRecolectionCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpGet("employee/{employeeId}/{type}")]
        async public Task<IActionResult> GetByEmployeeId([FromRoute] GetRecolectionsByEmployeeIdQuery query)
        {
            return Ok(await _mediator.Send(query));
        }

        [HttpGet("employee/{employeeId}/in-progress")]
        async public Task<IActionResult> GetInProgressRecolectionByEmployeeId([FromRoute] GetInProgressByEmployeeIdQuery query)
        {
            return Ok(await _mediator.Send(query));
        }

        [HttpPost("start/{recolectionId}")]
        async public Task<IActionResult> GetInProgressRecolectionByEmployeeId([FromRoute] StartRecolectionCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        [HttpGet("validate/{employeeId}")]
        async public Task<IActionResult> ValidateInProgressRecolectionByEmployee([FromRoute] ValidateEmployeeRecolectionQuery query)
        {
            return Ok(await _mediator.Send(query));
        }
    }
}
