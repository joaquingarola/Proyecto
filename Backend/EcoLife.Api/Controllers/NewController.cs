using System.ComponentModel.DataAnnotations;

using EcoLife.Api.Application;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace EcoLife.Api.Controllers
{
    [Route("api/news")]
    [Authorize]
    [ApiController]
    public class NewController : Controller
    {
        private readonly IMediator _mediator;

        public NewController(IMediator mediator)
        {
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
        async public Task<IActionResult> UpdateNewAsync([FromBody] UpdateNewCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [AllowAnonymous]
        [HttpPost("citizen-comment")]
        async public Task<IActionResult> PostCitizenCommentAsync([FromBody] CreateCitizenCommentCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
