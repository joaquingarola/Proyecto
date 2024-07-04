using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application.Command.Route
{
    public class UpdateRouteCommandHandler : IRequestHandler<UpdateRouteCommand, int>
    {
        private readonly IUnitOfWork _uow;

        public UpdateRouteCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<int> Handle(UpdateRouteCommand command, CancellationToken cancellationToken)
        {
            var route = await _uow.RouteRepository.GetByIdWithContainers(command.Id);

            route.Periodicity = command.Periodicity;
            route.Description = command.Description;
            route.Quantity = command.Quantity;
            route.WasteType = command.WasteType;
            route.RouteContainers.Clear();

            foreach (var routeContainer in command.RouteContainers)
            {
                route.RouteContainers.Add(new RouteContainers() { ContainerId = routeContainer.ContainerId });
            }

            var result = await _uow.RouteRepository.Update(route);

            return result.Id;
        }
    }
}
