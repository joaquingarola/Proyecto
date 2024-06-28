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
            var containers = await _uow.ContainerRepository.GetAllWithRouteAsync();
            return Ok(containers);
        }

        [HttpGet("without-route")]
        async public Task<IActionResult> GetAllWithoutRouteAsync()
        {
            var containers = await _uow.ContainerRepository.GetAllWithRouteAsync();

            return Ok(containers.Where(x => x.RouteContainer == null && x.Status == "Activo"));
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

            if(container.RouteContainer != null)
            {
                var route = await _uow.RouteRepository.GetByIdAsync(container.RouteContainer.RouteId);

                route.Quantity -= 1;

                await _uow.RouteRepository.SaveChangesAsync();
            }

            await _uow.ContainerRepository.Delete(containerId);

            return Ok();
        }

        [HttpPut]
        async public Task<IActionResult> UpdateContainerAsync([FromBody] Container container)
        {
            var result = await _uow.ContainerRepository.Update(container);

            if (container.RouteContainer != null && container.Status == "Dañado")
            {
                var route = await _uow.RouteRepository.GetByIdWithRouteContainers(container.RouteContainer!.RouteId);

                var routeContainer = route.RouteContainers.First(x => x.ContainerId == container.Id);

                route.RouteContainers.Remove(routeContainer);

                route.Quantity -= 1;

                await _uow.RouteRepository.SaveChangesAsync();
            }

            return Ok(result);
        }
    }
}
