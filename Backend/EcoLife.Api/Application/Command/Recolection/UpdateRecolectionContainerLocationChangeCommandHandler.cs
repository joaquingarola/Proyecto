using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Services.Interfaces;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateRecolectionContainerLocationChangeCommandHandler : IRequestHandler<UpdateRecolectionContainerLocationChangeCommand>
    {
        private readonly IUnitOfWork _uow;
        private readonly IOptimizationService _optimizationService;

        public UpdateRecolectionContainerLocationChangeCommandHandler(IUnitOfWork uow, IOptimizationService optimizationService)
        {
            _uow = uow;
            _optimizationService = optimizationService;
        }

        public async Task Handle(UpdateRecolectionContainerLocationChangeCommand command, CancellationToken cancellationToken)
        {
            var container = await _uow.ContainerRepository.GetContainerWithRecolectionsAsync(command.ContainerId);

            var recolectionContainers = container.RecolectionContainers
                .Where(rc => rc.Recolection.Status == RecolectionStatus.Planified || rc.Recolection.Status == RecolectionStatus.PendingVehicle)
                .ToList();

            if (recolectionContainers.Any())
            {
                foreach (var rc in recolectionContainers)
                {
                    await _optimizationService.OrderContainersRoute(rc.RecolectionId);
                }
            }
        }
    }
}
