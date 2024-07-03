using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteEmployeeCommandHandler : IRequestHandler<DeleteEmployeeCommand>
    {
        private readonly IUnitOfWork _uow;

        public DeleteEmployeeCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(DeleteEmployeeCommand command, CancellationToken cancellationToken)
        {
            var employee = await _uow.EmployeeRepository.GetByIdAsync(command.EmployeeId);

            var user = await _uow.UserRepository.GetByUser(employee.Email);

            await _uow.UserRepository.Delete(user!.Id);

            await _uow.EmployeeRepository.Delete(command.EmployeeId);
        }
    }
}
