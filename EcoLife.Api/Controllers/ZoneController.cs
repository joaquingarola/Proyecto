using AutoMapper;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace EcoLife.Api.Controllers
{
    [Route("api/zones")]
    [ApiController]
    public class ZoneController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public ZoneController(IUnitOfWork uow, IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var zones = await _uow.ZoneRepository.GetAllAsync();
            return Ok(zones);
        }

        [HttpGet("{zoneId}")]
        async public Task<IActionResult> GetByIdAsync([FromRoute, Required] int zoneId)
        {
            var zone = await _uow.ZoneRepository.GetByIdAsync(zoneId);
            return Ok(zone);
        }

        [HttpPost]
        async public Task<IActionResult> PostZoneAsync([FromBody] ZoneDto zoneDto)
        {
            var zone = _mapper.Map<Zone>(zoneDto);
            var result = await _uow.ZoneRepository.AddAndSaveAsync(zone);
            return Ok(result);
        }

        [HttpDelete("{zoneId}")]
        async public Task<IActionResult> DeleteByIdAsync([FromRoute, Required] int zoneId)
        {
            await _uow.ZoneRepository.Delete(zoneId);
            return Ok(new { msg = "Zone removed successfully" });
        }
    }
}

