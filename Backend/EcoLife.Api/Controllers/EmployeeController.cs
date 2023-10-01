using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using System.ComponentModel.DataAnnotations;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EcoLife.Api.Helpers.Email;

namespace EcoLife.Api.Controllers
{
    [Route("api/employees")]
    [Authorize]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;

        public EmployeeController(IUnitOfWork uow, IMapper mapper, IEmailSender emailSender)
        {
            this._uow = uow;
            this._mapper = mapper;
            this._emailSender = emailSender;
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
            var employeeByEmail = await _uow.EmployeeRepository.GetByEmailAsync(employeeDto.Email);
            if (employeeByEmail != null)
                return BadRequest("Ya existe un usuario con ese email");

            var employeeByDni = await _uow.EmployeeRepository.GetByDniAsync(employeeDto.Dni);
            if (employeeByDni != null)
                return BadRequest("Ya existe un usuario con ese dni");

            var user = _mapper.Map<User>(_mapper.Map<Employee>(employeeDto));

            await _emailSender.SendEmailAsync(user.Username, user.Password);

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            var result = await _uow.UserRepository.AddAndSaveAsync(user);
            
            return Ok(result);
        }

        [HttpPut]
        async public Task<IActionResult> UpdateEmployeeAsync([FromBody] Employee editEmployee)
        {
            var employeeByEmail = await _uow.EmployeeRepository.GetByEmailAsync(editEmployee.Email);
            if (employeeByEmail?.Id != editEmployee.Id)
                return BadRequest("Ya existe un usuario con ese email");

            var employeeByDni = await _uow.EmployeeRepository.GetByDniAsync(editEmployee.Dni);
            if (employeeByDni?.Id != editEmployee.Id)
                return BadRequest("Ya existe un usuario con ese dni");

            var result = await _uow.EmployeeRepository.Update(editEmployee);

            return Ok(result);
        }

        [HttpDelete("{employeeId}")]
        async public Task<IActionResult> DeleteByIdAsync([FromRoute, Required] int employeeId)
        {
            var employee = await _uow.EmployeeRepository.GetByIdAsync(employeeId);
            var user = await _uow.UserRepository.GetByUser(employee.Email);

            await _uow.UserRepository.Delete(user!.Id);
            await _uow.EmployeeRepository.Delete(employeeId);

            return Ok();
        }
    }
}
