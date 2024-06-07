using System.ComponentModel.DataAnnotations;

using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/routes")]
    [Authorize]
    [ApiController]
    public class RouteController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public RouteController(IUnitOfWork uow, IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        [HttpPost]
        async public Task<IActionResult> AddNewRoute([FromBody] RouteDto routeDto)
        {
            var route = new RouteEntity(routeDto.Description, routeDto.Periodicity, routeDto.Quantity, routeDto.WasteType);

            foreach (var container in routeDto.Containers)
            {
                var data = await _uow.ContainerRepository.GetByIdAsync(container.Id);
                if (data != null)
                {
                    route.Containers.Add(data);
                }
            }

            await _uow.RouteRepository.AddAndSaveAsync(route);

            return Ok();
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var routes = await _uow.RouteRepository.GetAllWithContainers();
            return Ok(routes);
        }

        [HttpGet("{routeId}")]
        async public Task<IActionResult> GetRouteByIdAsync([FromRoute, Required] int routeId)
        {
            var route = await _uow.RouteRepository.GetByIdWithContainers(routeId);
            return Ok(route);
        }

        [HttpPost("update")]
        async public Task<IActionResult> UpdateRouteAsync([FromBody] RouteEntity editRoute)
        {
            var containersRoute = await _uow.ContainerRepository.GetByRoute(editRoute.Id);

            foreach (var container in containersRoute)
            {
                container.RouteId = null;
            }

            await _uow.ContainerRepository.SaveChangesAsync();

            var route = await _uow.RouteRepository.GetByIdWithContainers(editRoute.Id);

            route.Periodicity = editRoute.Periodicity;
            route.Description = editRoute.Description;
            route.Quantity = editRoute.Quantity;
            route.WasteType = editRoute.WasteType;

            foreach (var container in editRoute.Containers)
            {
                var data = await _uow.ContainerRepository.GetByIdAsync(container.Id);

                route.Containers.Add(data);
            }

            await _uow.RouteRepository.Update(route);

            return Ok();
        }

        [HttpDelete("{routeId}")]
        async public Task<IActionResult> DeleteRouteByIdAsync([FromRoute, Required] int routeId)
        {
            var route = await _uow.RouteRepository.GetByIdWithContainers(routeId);

            foreach (var container in route.Containers)
            {
                container.RouteId = null;
            }

            _uow.RouteRepository.Remove(route);

            await _uow.RouteRepository.SaveChangesAsync();

            return Ok();
        }
    }
}
