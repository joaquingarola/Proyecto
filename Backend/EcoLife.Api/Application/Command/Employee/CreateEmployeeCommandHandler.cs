using AutoMapper;

using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos.Response;
using EcoLife.Api.Entities;
using EcoLife.Api.Helpers.Email;

using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, CreateEmployeeResponseDto>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;

        public CreateEmployeeCommandHandler(IUnitOfWork uow, IMapper mapper, IEmailSender emailSender)
        {
            _uow = uow;
            _mapper = mapper;
            _emailSender = emailSender;
        }

        public async Task<CreateEmployeeResponseDto> Handle(CreateEmployeeCommand command, CancellationToken cancellationToken)
        {
            var employeeByEmail = await _uow.EmployeeRepository.GetByEmailAsync(command.Email);

            if (employeeByEmail != null)
                return new CreateEmployeeResponseDto() { Success = false, Message = "Ya existe un usuario con ese email." };

            var employeeByDni = await _uow.EmployeeRepository.GetByDniAsync(command.Dni);
            
            if (employeeByDni != null)
                return new CreateEmployeeResponseDto() { Success = false, Message = "Ya existe un usuario con ese DNI." };

            var user = _mapper.Map<User>(_mapper.Map<Employee>(command));

            await _emailSender.SendEmailAsync(user.Username, user.Password, EmailType.Create);

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            var result = await _uow.UserRepository.AddAndSaveAsync(user);

            return new CreateEmployeeResponseDto() { Success = true, Id = result.Id };
        }
    }
}
