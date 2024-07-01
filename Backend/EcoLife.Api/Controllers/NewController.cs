using System.ComponentModel.DataAnnotations;

using AutoMapper;

using EcoLife.Api.Application.Command.News;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace EcoLife.Api.Controllers
{
    [Route("api/news")]
    [Authorize]
    [ApiController]
    public class NewController : Controller
    {
        private readonly IMediator _mediator;
        private readonly IUnitOfWork _uow;

        public NewController(IUnitOfWork uow, IMediator mediator)
        {
            _uow = uow;
            _mediator = mediator;
        }

        [AllowAnonymous]
        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            return Ok(await _mediator.Send(new GetAllNewsQuery()));
        }

        [HttpPost]
        async public Task<IActionResult> PostNewAsync([FromBody] CreateNewCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{newId}")]
        async public Task<IActionResult> DeleteNewByIdAsync([FromRoute, Required] DeleteNewCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        [HttpPut]
        async public Task<IActionResult> UpdateNewAsync([FromBody] EditNewCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
