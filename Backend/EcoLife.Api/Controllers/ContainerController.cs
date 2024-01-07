using System.ComponentModel.DataAnnotations;

using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/containers")]
    [Authorize]
    [ApiController]
    public class ContainerController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public ContainerController(IUnitOfWork uow, IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var containers = await _uow.ContainerRepository.GetAllWithZoneAsync();
            return Ok(containers);
        }

        [HttpPost]
        async public Task<IActionResult> PostContainerAsync([FromBody] ContainerDto containerDto)
        {
            var container = _mapper.Map<Container>(containerDto);
            var result = await _uow.ContainerRepository.AddAndSaveAsync(container);
            return Ok(result);
        }

        [HttpDelete("{newId}")]
        async public Task<IActionResult> DeleteContainerByIdAsync([FromRoute, Required] int containerId)
        {
            await _uow.ContainerRepository.Delete(containerId);
            return Ok();
        }

        [HttpPut]
        async public Task<IActionResult> UpdateContainerAsync([FromBody] Container editContainer)
        {
            var result = await _uow.ContainerRepository.Update(editContainer);
            return Ok(result);
        }
    }
}
