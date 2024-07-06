using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using EcoLife.Api.Services.Interfaces;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateWasteCenterCommandHandler : IRequestHandler<UpdateWasteCenterCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptimizationService _optimizationService;

        public UpdateWasteCenterCommandHandler(IUnitOfWork uow, IMapper mapper, IOptimizationService optimizationService)
        {
            _uow = uow;
            _mapper = mapper;
            _optimizationService = optimizationService;
        }

        public async Task<int> Handle(UpdateWasteCenterCommand command, CancellationToken cancellationToken)
        {
            var updateOrderRoute = false;

            var wasteCenter = await _uow.WasteCenterRepository.GetByIdAsync(command.Id);

            if (ValidateLocationChange(wasteCenter, command))
                updateOrderRoute = true;

            _mapper.Map(command, wasteCenter);

            var result = await _uow.WasteCenterRepository.Update(wasteCenter);

            if (updateOrderRoute)
            {
                var recolection = await _uow.RecolectionRepository.GetByWasteCenterId(command.Id);

                if (recolection != null)
                {
                    await _optimizationService.OrderContainersRoute(recolection.Id);
                }
            }

            return result.Id;
        }

        private static bool ValidateLocationChange(WasteCenter previousCenter, UpdateWasteCenterCommand newCenter)
        {
            if (previousCenter.Latitude != newCenter.Latitude || previousCenter.Longitude != newCenter.Longitude)
                return true;

            return false;
        }
    }
}
