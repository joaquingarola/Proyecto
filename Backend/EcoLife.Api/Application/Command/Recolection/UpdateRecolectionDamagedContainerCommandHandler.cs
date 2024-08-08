using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Services.Interfaces;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateRecolectionDamagedContainerCommandHandler : IRequestHandler<UpdateRecolectionDamagedContainerCommand>
    {
        private readonly IUnitOfWork _uow;
        private readonly IOptimizationService _optimizationService;
        private readonly IMediator _mediator;

        public UpdateRecolectionDamagedContainerCommandHandler(IUnitOfWork uow, IOptimizationService optimizationService, IMediator mediator)
        {
            _uow = uow;
            _optimizationService = optimizationService;
            _mediator = mediator;
        }

        public async Task Handle(UpdateRecolectionDamagedContainerCommand command, CancellationToken cancellationToken)
        {
            var container = await _uow.ContainerRepository.GetContainerWithRecolectionsAsync(command.ContainerId);

            var removeFromRoute = container.RouteId != null;

            container.Status = ContainerStatus.Damaged;

            if (removeFromRoute)
            {
                var route = await _uow.RouteRepository.GetByIdAsync(container.RouteId.Value);

                route.Quantity -= 1;

                await _uow.RouteRepository.SaveChangesAsync();

                container.RouteId = null;
            }

            var recolectionIdList = new List<int>();

            var recolectionContainers = container.RecolectionContainers
                .Where(rc => rc.Recolection.Status == RecolectionStatus.Planified || rc.Recolection.Status == RecolectionStatus.PendingVehicle)
                .ToList();

            if (recolectionContainers.Any())
            {
                foreach(var rc in recolectionContainers)
                {
                    recolectionIdList.Add(rc.RecolectionId);

                    container.RecolectionContainers.Remove(rc);
                }
            }

            await _uow.ContainerRepository.SaveChangesAsync();

            await _mediator.Send(new CreateDamageCommand() { Type = DamageType.Container }, cancellationToken);

            foreach (var recId in recolectionIdList)
            {
                await _optimizationService.OrderContainersRoute(recId);
            }
        }
    }
}
