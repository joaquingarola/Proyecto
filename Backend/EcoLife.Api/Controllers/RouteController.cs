using System.ComponentModel.DataAnnotations;
using System.Linq;

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

            foreach (var routeContainer in routeDto.RouteContainers)
            {
                route.RouteContainers.Add(new RouteContainers() { ContainerId = routeContainer.ContainerId!.Value });
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
            List<int> order = new List<int> { 2016, 2017, 2021, 2019, 2018, 2023, 2024, 2020, 2022 };

            var route = await _uow.RouteRepository.GetByIdWithContainers(routeId);

            // route.RouteContainers = route.RouteContainers.OrderBy(item => item.Order).ToList();

            return Ok(route);
        }

        [HttpPost("update")]
        async public Task<IActionResult> UpdateRouteAsync([FromBody] RouteEntity editRoute)
        {
            var route = await _uow.RouteRepository.GetByIdWithContainers(editRoute.Id);

            route.Periodicity = editRoute.Periodicity;
            route.Description = editRoute.Description;
            route.Quantity = editRoute.Quantity;
            route.WasteType = editRoute.WasteType;
            route.RouteContainers.Clear();

            foreach (var routeContainer in editRoute.RouteContainers)
            {
                route.RouteContainers.Add(new RouteContainers() { ContainerId = routeContainer.ContainerId });
            }

            await _uow.RouteRepository.Update(route);

            return Ok();
        }

        [HttpDelete("{routeId}")]
        async public Task<IActionResult> DeleteRouteByIdAsync([FromRoute, Required] int routeId)
        {
            var route = await _uow.RouteRepository.GetByIdWithContainers(routeId);

            _uow.RouteRepository.Remove(route);

            await _uow.RouteRepository.SaveChangesAsync();

            return Ok();
        }
    }
}
