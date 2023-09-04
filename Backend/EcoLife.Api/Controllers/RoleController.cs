using EcoLife.Api.DataAccess.UnitOfWork;

using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/roles")]
    [ApiController]
    public class RoleController : Controller
    {
        private readonly IUnitOfWork _uow;

        public RoleController(IUnitOfWork uow)
        {
            this._uow = uow;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var roles = await _uow.RoleRepository.GetAllAsync();
            return Ok(roles);
        }
    }
}
