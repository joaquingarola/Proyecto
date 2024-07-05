using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Services.Interfaces;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateRecolectionCommandHandler : IRequestHandler<UpdateRecolectionCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptimizationService _optimizationService;

        public UpdateRecolectionCommandHandler(IUnitOfWork uow, IMapper mapper, IOptimizationService optimizationService)
        {
            _uow = uow;
            _mapper = mapper;
            _optimizationService = optimizationService;
        }

        public async Task<int> Handle(UpdateRecolectionCommand command, CancellationToken cancellationToken)
        {
            var updateOrderRoute = false;

            var existingRecolection = await _uow.RecolectionRepository.GetByIdAsync(command.Id);

            if (command.WasteCenterId != existingRecolection.WasteCenterId || command.VehicleCenterId != existingRecolection.VehicleCenterId)
            {
                updateOrderRoute = true;
            }

            var result = await _uow.RecolectionRepository.Update(_mapper.Map(command, existingRecolection));

            if (updateOrderRoute)
            {
                await _optimizationService.OrderContainersRoute(result.Id);
            }

            return result.Id;
        }
    }
}
