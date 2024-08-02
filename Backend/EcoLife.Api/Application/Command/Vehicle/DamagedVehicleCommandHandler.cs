﻿using EcoLife.Api.Data.Constants;
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

            var planifiedRecolections = recolections.Where(x => x.Status == RecolectionStatus.Planified);

            if (planifiedRecolections.Any())
            {
                foreach (var rec in planifiedRecolections)
                {
                    rec.Status = RecolectionStatus.PendingVehicle;
                }
            }

            await _uow.RecolectionRepository.SaveChangesAsync();

            var vehicle = await _uow.VehicleRepository.GetByIdAsync(command.VehicleId);

            vehicle.Status = VehicleStatus.Damaged;

            await _uow.VehicleRepository.Update(vehicle);
        }
    }
}
