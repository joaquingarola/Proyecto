using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos.Response;
using EcoLife.Api.Entities;
using EcoLife.Api.Helpers.Email;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand, CreateEmployeeResponseDto>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;

        public UpdateEmployeeCommandHandler(IUnitOfWork uow, IMapper mapper, IEmailSender emailSender)
        {
            _uow = uow;
            _mapper = mapper;
            _emailSender = emailSender;
            _emailSender = emailSender;
        }

        public async Task<CreateEmployeeResponseDto> Handle(UpdateEmployeeCommand command, CancellationToken cancellationToken)
        {
            var emailChange = false;

            var editEmployee = await _uow.EmployeeRepository.GetByIdAsync(command.Id);

            if(editEmployee.Email != command.Email)
            {
                emailChange = true;
            }

            _mapper.Map(command, editEmployee);

            if(emailChange) { 
                var employeeByEmail = await _uow.EmployeeRepository.GetByEmailAsync(command.Email);

                if (employeeByEmail != null && employeeByEmail.Id != editEmployee.Id)
                    return new CreateEmployeeResponseDto() { Success = false, Message = "Ya existe un usuario con ese email." };
            }

            var employeeByDni = await _uow.EmployeeRepository.GetByDniAsync(command.Dni);

            if (employeeByDni != null && employeeByDni.Id != editEmployee.Id)
                return new CreateEmployeeResponseDto() { Success = false, Message = "Ya existe un usuario con ese DNI." };

            var result = await _uow.EmployeeRepository.Update(editEmployee);

            var user = await _uow.UserRepository.GetByEmployeeId(editEmployee.Id);

            if(emailChange)
            {
                _mapper.Map(editEmployee, user);

                await _emailSender.SendEmailAsync(user.Username, user.Password);

                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                await _uow.UserRepository.Update(user);
            }

            return new CreateEmployeeResponseDto() { Success = true, Id = result.Id };
        }
    }
}
