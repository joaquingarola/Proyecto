using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Services.Interfaces;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateRecolectionDamagedContainerCommandHandler : IRequestHandler<UpdateRecolectionDamagedContainerCommand>
    {
        private readonly IUnitOfWork _uow;
        private readonly IOptimizationService _optimizationService;

        public UpdateRecolectionDamagedContainerCommandHandler(IUnitOfWork uow, IOptimizationService optimizationService)
        {
            _uow = uow;
            _optimizationService = optimizationService;
        }

        public async Task Handle(UpdateRecolectionDamagedContainerCommand command, CancellationToken cancellationToken)
        {
            var container = await _uow.ContainerRepository.GetContainerWithRecolectionsAsync(command.ContainerId);

            var recolectionIdList = new List<int>();

            var recolectionContainers = container.RecolectionContainers
                .Where(rc => rc.Recolection.Status == "Planificada")
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

            foreach (var recId in recolectionIdList)
            {
                await _optimizationService.OrderContainersRoute(recId);
            }
        }
    }
}
