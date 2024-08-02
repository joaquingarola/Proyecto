using EcoLife.Api.Data.Constants;
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
            var maintenance = await _uow.MaintenanceRepository.GetByIdWithVehicleAsync(command.MaintenanceId);

            maintenance.EndDate = command.EndDate;

            maintenance.Vehicle!.Status = VehicleStatus.Available;

            var result = await _uow.MaintenanceRepository.Update(maintenance);

            return result.Id;
        }
    }
}
