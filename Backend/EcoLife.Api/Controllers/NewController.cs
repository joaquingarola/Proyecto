using System.ComponentModel.DataAnnotations;

using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/news")]
    [Authorize]
    [ApiController]
    public class NewController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public NewController(IUnitOfWork uow, IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var news = await _uow.NewRepository.GetAllAsync();
            return Ok(news.OrderByDescending(x => x.Date));
        }

        [HttpPost]
        async public Task<IActionResult> PostNewAsync([FromBody] NewDto newDto)
        {
            var news = _mapper.Map<New>(newDto);
            var result = await _uow.NewRepository.AddAndSaveAsync(news);
            return Ok(result);
        }

        [HttpDelete("{newId}")]
        async public Task<IActionResult> DeleteNewByIdAsync([FromRoute, Required] int newId)
        {
            await _uow.NewRepository.Delete(newId);
            return Ok();
        }

        [HttpPut]
        async public Task<IActionResult> UpdateNewAsync([FromBody] New editNew)
        {
            var result = await _uow.NewRepository.Update(editNew);
            return Ok(result);
        }
    }
}
