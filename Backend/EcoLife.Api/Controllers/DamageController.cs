using System.ComponentModel.DataAnnotations;

using EcoLife.Api.Application;
using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/damages")]
    [ApiController]
    public class DamageController : Controller
    {
        private readonly IMediator _mediator;

        public DamageController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{timePeriod}")]
        async public Task<IActionResult> GetDamagesStats([FromRoute, Required] GetDamagesStatsQuery query)
        {
            return Ok(await _mediator.Send(query));
        }
    }
}
