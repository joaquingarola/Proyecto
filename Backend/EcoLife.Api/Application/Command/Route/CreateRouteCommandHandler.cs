using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateRouteCommandHandler : IRequestHandler<CreateRouteCommand, int>
    {
        private readonly IUnitOfWork _uow;

        public CreateRouteCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<int> Handle(CreateRouteCommand command, CancellationToken cancellationToken)
        {
            var route = new RouteEntity(command.Description, command.Periodicity, command.Quantity, command.WasteType);

            foreach (var routeContainer in command.RouteContainers)
            {
                route.RouteContainers.Add(new RouteContainers() { ContainerId = routeContainer.ContainerId!.Value });
            }

            var result = await _uow.RouteRepository.AddAndSaveAsync(route);

            return result.Id;
        }
    }
}
