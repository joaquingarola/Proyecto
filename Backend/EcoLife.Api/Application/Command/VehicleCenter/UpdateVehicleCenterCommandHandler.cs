using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using EcoLife.Api.Services.Interfaces;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateVehicleCenterCommandHandler : IRequestHandler<UpdateVehicleCenterCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptimizationService _optimizationService;

        public UpdateVehicleCenterCommandHandler(IUnitOfWork uow, IMapper mapper, IOptimizationService optimizationService)
        {
            _uow = uow;
            _mapper = mapper;
            _optimizationService = optimizationService;
        }

        public async Task<int> Handle(UpdateVehicleCenterCommand command, CancellationToken cancellationToken)
        {
            var updateOrderRoute = false;

            var vehicleCenter = await _uow.VehicleCenterRepository.GetByIdAsync(command.Id);

            if (ValidateLocationChange(vehicleCenter, command))
                updateOrderRoute = true;

            _mapper.Map(command, vehicleCenter);

            var result = await _uow.VehicleCenterRepository.Update(vehicleCenter);

            if (updateOrderRoute)
            {
                var recolection = await _uow.RecolectionRepository.GetByVehicleCenterId(command.Id);

                if (recolection != null)
                {
                    await _optimizationService.OrderContainersRoute(recolection.Id);
                }
            }
            
            return result.Id;
        }

        private static bool ValidateLocationChange(VehicleCenter previousCenter, UpdateVehicleCenterCommand newCenter)
        {
            if (previousCenter.Latitude != newCenter.Latitude || previousCenter.Longitude != newCenter.Longitude)
                return true;

            return false;
        }
    }
}
