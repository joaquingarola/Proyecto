using System.ComponentModel.DataAnnotations;

using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/vehicle-center")]
    [Authorize]
    [ApiController]

    public class VehicleCenterController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public VehicleCenterController(IUnitOfWork uow, IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var vehicleCenters = await _uow.VehicleCenterRepository.GetAllAsync();
            return Ok(vehicleCenters);
        }

        [HttpPost]
        async public Task<IActionResult> PostVehicleCenterAsync([FromBody] VehicleCenterDto vehicleCenterDto)
        {
            var vehicleCenter = _mapper.Map<VehicleCenter>(vehicleCenterDto);
            var result = await _uow.VehicleCenterRepository.AddAndSaveAsync(vehicleCenter);
            return Ok(result);
        }

        [HttpDelete("{vehicleCenterId}")]
        async public Task<IActionResult> DeleteVehicleCenterByIdAsync([FromRoute, Required] int vehicleCenterId)
        {
            await _uow.VehicleCenterRepository.Delete(vehicleCenterId);
            return Ok();
        }

        [HttpPut]
        async public Task<IActionResult> UpdateVehicleCenterAsync([FromBody] VehicleCenterDto vehicleCenterDto)
        {
            var vehicleCenter = _mapper.Map<VehicleCenter>(vehicleCenterDto);
            var result = await _uow.VehicleCenterRepository.Update(vehicleCenter);
            return Ok(result);
        }
    }
}
