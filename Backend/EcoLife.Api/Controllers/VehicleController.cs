using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace EcoLife.Api.Controllers
{
    [Route("api/vehicles")]
    [ApiController]
    public class VehicleController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public VehicleController(IUnitOfWork uow, IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var vehicles = await _uow.VehicleRepository.GetAllAsync();
            return Ok(vehicles);
        }

        [HttpGet("{vehicleId}")]
        async public Task<IActionResult> GetByIdAsync([FromRoute, Required] int vehicleId)
        {
            var vehicle = await _uow.VehicleRepository.GetByIdAsync(vehicleId);
            return Ok(vehicle);
        }

        [HttpPost]
        async public Task<IActionResult> PostAsync([FromBody] VehicleDto vehicleDto)
        {
            var vehicle = _mapper.Map<Vehicle>(vehicleDto);
            var result = await _uow.VehicleRepository.AddAndSaveAsync(vehicle);
            return Ok(result);
        }

        [HttpDelete("{vehicleId}")]
        async public Task<IActionResult> DeleteByIdAsync([FromRoute, Required] int vehicleId)
        {
            await _uow.VehicleRepository.Delete(vehicleId);
            return Ok("Vehicle removed successfully");
        }
    }
}
