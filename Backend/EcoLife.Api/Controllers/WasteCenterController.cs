using System.ComponentModel.DataAnnotations;

using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/waste-center")]
    [Authorize]
    [ApiController]

    public class WasteCenterController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public WasteCenterController(IUnitOfWork uow, IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var wasteCenters = await _uow.WasteCenterRepository.GetAllAsync();
            return Ok(wasteCenters);
        }

        [HttpPost]
        async public Task<IActionResult> PostWasteCenterAsync([FromBody] WasteCenterDto wasteCenterDto)
        {
            var wasteCenter = _mapper.Map<WasteCenter>(wasteCenterDto);
            var result = await _uow.WasteCenterRepository.AddAndSaveAsync(wasteCenter);
            return Ok(result);
        }

        [HttpDelete("{wasteCenterId}")]
        async public Task<IActionResult> DeleteWasteCenterByIdAsync([FromRoute, Required] int wasteCenterId)
        {
            await _uow.WasteCenterRepository.Delete(wasteCenterId);
            return Ok();
        }

        [HttpPut]
        async public Task<IActionResult> UpdateWasteCenterAsync([FromBody] WasteCenterDto wasteCenterDto)
        {
            var wasteCenter = _mapper.Map<WasteCenter>(wasteCenterDto);
            var result = await _uow.WasteCenterRepository.Update(wasteCenter);
            return Ok(result);
        }
    }
}
