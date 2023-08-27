using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace EcoLife.Api.Controllers
{
    [Route("api/maintenance")]
    [ApiController]
    public class MaintenanceController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public MaintenanceController(IUnitOfWork uow, IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var maintenances = await _uow.MaintenanceRepository.GetAllWithVehicleAsync();
            return Ok(_mapper.Map<List<MaintenanceResponseDto>>(maintenances));
        }

        [HttpGet("{maintenanceId}")]
        async public Task<IActionResult> GetByIdAsync([FromRoute, Required] int maintenanceId)
        {
            var maintenance = await _uow.MaintenanceRepository.GetByIdAsync(maintenanceId);
            return Ok(maintenance);
        }

        [HttpPost]
        async public Task<IActionResult> PostMaintenanceAsync([FromBody] MaintenanceDto maintenanceDto)
        {
            var maintenance = _mapper.Map<Maintenance>(maintenanceDto);
            var result = await _uow.MaintenanceRepository.AddAndSaveAsync(maintenance);
            return Ok(result);
        }

        [HttpPost("complete/{maintenanceId}")]
        async public Task<IActionResult> PostCompleteMaintenanceAsync([FromBody] MaintenanceCompletedDto maintenanceCompletedDto, [FromRoute] int maintenanceId)
        {
            var maintenance = await _uow.MaintenanceRepository.GetByIdAsync(maintenanceId);
            maintenance.EndDate = maintenanceCompletedDto.EndDate;
            var result = await _uow.MaintenanceRepository.Update(maintenance);
            return Ok(result);
        }
    }
}
