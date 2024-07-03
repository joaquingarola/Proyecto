using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand, CreateEmployeeResponseDto>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public UpdateEmployeeCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<CreateEmployeeResponseDto> Handle(UpdateEmployeeCommand command, CancellationToken cancellationToken)
        {
            var editEmployee = _mapper.Map<Employee>(command);

            var employeeByEmail = await _uow.EmployeeRepository.GetByEmailAsync(command.Email);

            if (employeeByEmail != null && employeeByEmail.Id != editEmployee.Id)
                return new CreateEmployeeResponseDto() { Success = false, Message = "Ya existe un usuario con ese email." };

            var employeeByDni = await _uow.EmployeeRepository.GetByDniAsync(command.Dni);

            if (employeeByDni != null && employeeByDni.Id != editEmployee.Id)
                return new CreateEmployeeResponseDto() { Success = false, Message = "Ya existe un usuario con ese DNI." };

            var result = await _uow.EmployeeRepository.Update(editEmployee);

            return new CreateEmployeeResponseDto() { Success = true, Id = result.Id };
        }
    }
}
