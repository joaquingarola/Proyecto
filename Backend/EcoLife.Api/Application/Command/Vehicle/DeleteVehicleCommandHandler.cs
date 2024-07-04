using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application.Command.Vehicle
{
    public class DeleteVehicleCommandHandler : IRequestHandler<DeleteVehicleCommand>
    {
        private readonly IUnitOfWork _uow;

        public DeleteVehicleCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(DeleteVehicleCommand command, CancellationToken cancellationToken)
        {
            await _uow.VehicleRepository.Delete(command.VehicleId);
        }
    }
}
