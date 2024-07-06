using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using AutoMapper;
using MediatR;
using EcoLife.Api.Services.Interfaces;

namespace EcoLife.Api.Application
{
    public class UpdateContainerCommandHandler : IRequestHandler<UpdateContainerCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptimizationService _optimizationService;

        public UpdateContainerCommandHandler(IUnitOfWork uow, IMapper mapper, IOptimizationService optimizationService)
        {
            _uow = uow;
            _mapper = mapper;
            _optimizationService = optimizationService;
        }

        public async Task<int> Handle(UpdateContainerCommand command, CancellationToken cancellationToken)
        {
            var updateOrderRoute = false;

            var editContainer = await _uow.ContainerRepository.GetByIdAsync(command.Id);

            if (ValidateLocationChange(editContainer, command))
                updateOrderRoute = true;

            _mapper.Map(command, editContainer);

            var result = await _uow.ContainerRepository.Update(editContainer);

            var removeFromRoute = command.RouteContainer != null && command.Status == "Dañado";

            if (removeFromRoute)
            {
                var route = await _uow.RouteRepository.GetByIdWithRouteContainers(command.RouteContainer!.RouteId);

                var routeContainer = route.RouteContainers.First(x => x.ContainerId == command.Id);

                route.RouteContainers.Remove(routeContainer);

                route.Quantity -= 1;

                await _uow.RouteRepository.SaveChangesAsync();
            }

            if (command.RouteContainer != null && command.Status != "Dañado" && updateOrderRoute)
            {
                var recolection = await _uow.RecolectionRepository.GetByRouteId(command.RouteContainer!.RouteId);

                if (recolection != null)
                {
                    await _optimizationService.OrderContainersRoute(recolection.Id);
                }
            }

            return result.Id;
        }

        private static bool ValidateLocationChange(Container previousContainer, UpdateContainerCommand newContainer)
        {
            if (previousContainer.Latitude != newContainer.Latitude || previousContainer.Longitude != newContainer.Longitude)
                return true;

            return false;
        }
    }
}
