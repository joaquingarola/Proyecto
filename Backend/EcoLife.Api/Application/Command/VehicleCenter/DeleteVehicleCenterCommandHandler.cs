using EcoLife.Api.DataAccess.UnitOfWork;

using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteVehicleCenterCommandHandler : IRequestHandler<DeleteVehicleCenterCommand>
    {
        private readonly IUnitOfWork _uow;

        public DeleteVehicleCenterCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(DeleteVehicleCenterCommand command, CancellationToken cancellationToken)
        {
            await _uow.VehicleCenterRepository.Delete(command.VehicleCenterId);
        }
    }
}
