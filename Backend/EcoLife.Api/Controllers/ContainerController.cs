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

        [HttpGet("without-route")]
        async public Task<IActionResult> GetAllWithoutRouteAsync()
        {
            var containers = await _uow.ContainerRepository.GetAllWithRouteAsync();

            return Ok(containers.Where(x => x.RouteId == null && x.Status == "Activo"));
        }

        [HttpPost]
        async public Task<IActionResult> PostContainerAsync([FromBody] ContainerDto containerDto)
        {
            var container = _mapper.Map<Container>(containerDto);
            var result = await _uow.ContainerRepository.AddAndSaveAsync(container);
            return Ok(result);
        }

        [HttpDelete("{containerId}")]
        async public Task<IActionResult> DeleteContainerByIdAsync([FromRoute, Required] int containerId)
        {
            var container = await _uow.ContainerRepository.GetByIdAsync(containerId);

            if(container.RouteId != null)
            {
                var route = await _uow.RouteRepository.GetByIdAsync(container.RouteId!.Value);

                route.Quantity -= 1;

                await _uow.RouteRepository.SaveChangesAsync();
            }

            await _uow.ContainerRepository.Delete(containerId);

            return Ok();
        }

        [HttpPut]
        async public Task<IActionResult> UpdateContainerAsync([FromBody] ContainerDto containerDto)
        {
            var container = _mapper.Map<Container>(containerDto);
            var result = await _uow.ContainerRepository.Update(container);
            return Ok(result);
        }
    }
}
