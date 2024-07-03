using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateMaintenanceCommandHandler : IRequestHandler<UpdateMaintenanceCommand, int>
    {
        private readonly IUnitOfWork _uow;

        public UpdateMaintenanceCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<int> Handle(UpdateMaintenanceCommand command, CancellationToken cancellationToken)
        {
            var maintenance = await _uow.MaintenanceRepository.GetByIdAsync(command.Id);

            maintenance.Description = command.Description;

            maintenance.StartDate = command.StartDate;

            var result = await _uow.MaintenanceRepository.Update(maintenance);

            return result.Id;
        }
    }
}
