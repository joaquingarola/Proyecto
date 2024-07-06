using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using EcoLife.Api.Services.Interfaces;

using MediatR;

namespace EcoLife.Api.Application.Command.Route
{
    public class UpdateRouteCommandHandler : IRequestHandler<UpdateRouteCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptimizationService _optimizationService;

        public UpdateRouteCommandHandler(IUnitOfWork uow, IMapper mapper, IOptimizationService optimizationService)
        {
            _uow = uow;
            _mapper = mapper;
            _optimizationService = optimizationService;
        }

        public async Task<int> Handle(UpdateRouteCommand command, CancellationToken cancellationToken)
        {
            var updateOrderRoute = false;

            var route = await _uow.RouteRepository.GetByIdWithContainers(command.Id);

            if (ValidateContainersChange(route.RouteContainers, command.RouteContainers))
                updateOrderRoute = true;

            _mapper.Map(command, route);

            route.RouteContainers.Clear();

            foreach (var routeContainer in command.RouteContainers)
            {
                route.RouteContainers.Add(new RouteContainers() { ContainerId = routeContainer.ContainerId });
            }

            var result = await _uow.RouteRepository.Update(route);

            if (updateOrderRoute)
            {
                var recolection = await _uow.RecolectionRepository.GetByRouteId(command.Id);

                if(recolection != null)
                {
                    await _optimizationService.OrderContainersRoute(recolection.Id);
                }
            }

            return result.Id;
        }

        private static bool ValidateContainersChange(ICollection<RouteContainers> previousContainers, ICollection<RouteContainers> newContainers)
        {
            if(previousContainers.Count != newContainers.Count) 
                return true; 

            foreach (var routeContainer in newContainers) 
            {
                if(previousContainers.All(x => x.ContainerId != routeContainer.ContainerId))
                    return true;
            }

            return false; 
        }
    }
}
