using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using System.ComponentModel.DataAnnotations;

using Microsoft.AspNetCore.Mvc;

namespace EcoLife.Api.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public EmployeeController(IUnitOfWork uow, IMapper mapper)
        {
            this._uow = uow;
            this._mapper = mapper;
        }

        [HttpGet]
        async public Task<IActionResult> GetAllAsync()
        {
            var employees = await _uow.EmployeeRepository.GetAllWithRoleAsync();
            return Ok(employees);
        }

        [HttpGet("{employeeId}")]
        async public Task<IActionResult> GetByIdAsync([FromRoute, Required] int employeeId)
        {
            var employee = await _uow.EmployeeRepository.GetByIdAsync(employeeId);
            return Ok(employee);
        }

        [HttpPost]
        async public Task<IActionResult> PostEmployeeAsync([FromBody] EmployeeDto employeeDto)
        {
            var employee = _mapper.Map<Employee>(employeeDto);
            var result = await _uow.EmployeeRepository.AddAndSaveAsync(employee);
            return Ok(result);
        }

        [HttpPut]
        async public Task<IActionResult> UpdateEmployeeAsync([FromBody] Employee editEmployee)
        {
            var result = await _uow.EmployeeRepository.Update(editEmployee);
            return Ok(result);
        }

        [HttpDelete("{employeeId}")]
        async public Task<IActionResult> DeleteByIdAsync([FromRoute, Required] int employeeId)
        {
            await _uow.EmployeeRepository.Delete(employeeId);
            return Ok();
        }
    }
}
