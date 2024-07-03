using EcoLife.Api.DataAccess.UnitOfWork;

using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteMaintenanceCommandHandler : IRequestHandler<DeleteMaintenanceCommand>
    {
        private readonly IUnitOfWork _uow;

        public DeleteMaintenanceCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(DeleteMaintenanceCommand command, CancellationToken cancellationToken)
        {
            await _uow.MaintenanceRepository.Delete(command.MaintenanceId);
        }
    }
}
