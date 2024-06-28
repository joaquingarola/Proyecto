using System.ComponentModel.DataAnnotations;

using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/recolections")]
    [Authorize]
    [ApiController]
    public class RecolectionController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public RecolectionController(IUnitOfWork uow, IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var recolections = await _uow.RecolectionRepository.GetAllWithEntities();
            return Ok(recolections);
        }

        [HttpGet("{recolectionId}")]
        async public Task<IActionResult> GetByIdAsync([FromRoute, Required] int recolectionId)
        {
            var recolection = await _uow.RecolectionRepository.GetByIdAsync(recolectionId);
            return Ok(recolection);
        }

        [HttpPost]
        async public Task<IActionResult> PostAsync([FromBody] RecolectionDto recolectionDto)
        {
            var recolection = _mapper.Map<Recolection>(recolectionDto);

            var result = await _uow.RecolectionRepository.AddAndSaveAsync(recolection);

            return Ok(result);
        }

        [HttpDelete("{recolectionId}")]
        async public Task<IActionResult> DeleteByIdAsync([FromRoute, Required] int recolectionId)
        {
            await _uow.RecolectionRepository.Delete(recolectionId);
            return Ok();
        }

        [HttpPost("update")]
        async public Task<IActionResult> UpdateAsync([FromBody] Recolection editRecolection)
        {
            var result = await _uow.RecolectionRepository.Update(editRecolection);
            return Ok(result);
        }
    }
}
