using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using EcoLife.Api.Services.Interfaces;

using MediatR;

using Microsoft.AspNetCore.Routing;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace EcoLife.Api.Application.Command.Route
{
    public class UpdateRouteCommandHandler : IRequestHandler<UpdateRouteCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptimizationService _optimizationService;
        private readonly IMediator _mediator;

        public UpdateRouteCommandHandler(IUnitOfWork uow, IMapper mapper, IOptimizationService optimizationService, IMediator mediator)
        {
            _uow = uow;
            _mapper = mapper;
            _optimizationService = optimizationService;
            _mediator = mediator;
        }

        public async Task<int> Handle(UpdateRouteCommand command, CancellationToken cancellationToken)
        {
            var updateOrderRoute = false;

            var route = await _uow.RouteRepository.GetByIdWithContainers(command.Id);

            if (ValidateContainersChange(route.Containers, command.Containers))
                updateOrderRoute = true;

            _mapper.Map(command, route);

            var result = await _uow.RouteRepository.Update(route);

            await UpdateContainersRoute(command.Containers, route.Id);

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

        private static bool ValidateContainersChange(ICollection<Container> previousContainers, ICollection<Container> newContainers)
        {
            if(previousContainers.Count != newContainers.Count) 
                return true; 

            foreach (var routeContainer in newContainers) 
            {
                if(previousContainers.All(x => x.Id != routeContainer.Id))
                    return true;
            }

            return false; 
        }

        private async Task UpdateContainersRoute(ICollection<Container> newContainers, int routeId)
        {
            var routeContainers = await _uow.ContainerRepository.GetByRouteId(routeId);

            foreach (var container in routeContainers)
            {
                await _mediator.Send(new SetContainerRouteIdCommand() { ContainerId = container.Id, RouteId = null });
            }

            foreach (var container in newContainers)
            {
                await _mediator.Send(new SetContainerRouteIdCommand() { ContainerId = container.Id, RouteId = routeId });
            }
        }
    }
}
