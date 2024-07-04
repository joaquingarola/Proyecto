using EcoLife.Api.DataAccess.UnitOfWork;

using MediatR;

namespace EcoLife.Api.Application
{
    public class CompleteMaintenanceCommandHandler : IRequestHandler<CompleteMaintenanceCommand, int>
    {
        private readonly IUnitOfWork _uow;

        public CompleteMaintenanceCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<int> Handle(CompleteMaintenanceCommand command, CancellationToken cancellationToken)
        {
            var maintenance = await _uow.MaintenanceRepository.GetByIdAsync(command.MaintenanceId);

            maintenance.EndDate = command.EndDate;

            var result = await _uow.MaintenanceRepository.Update(maintenance);

            return result.Id;
        }
    }
}
