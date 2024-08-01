using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application
{
    public class DamagedVehicleCommandHandler : IRequestHandler<DamagedVehicleCommand>
    {
        private readonly IUnitOfWork _uow;

        public DamagedVehicleCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(DamagedVehicleCommand command, CancellationToken cancellationToken)
        {
            var recolections = await _uow.RecolectionRepository.GetByVehicleId(command.VehicleId);

            var planifiedRecolections = recolections.Where(x => x.Status == "Planificada");

            if (planifiedRecolections.Any())
            {
                foreach (var rec in planifiedRecolections)
                {
                    rec.Status = "Vehículo pendiente";
                }
            }

            await _uow.RecolectionRepository.SaveChangesAsync();

            var vehicle = await _uow.VehicleRepository.GetByIdAsync(command.VehicleId);

            vehicle.Status = "Dañado";

            await _uow.VehicleRepository.Update(vehicle);
        }
    }
}
