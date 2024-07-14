using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application.Command.Route
{
    public class UpdateRouteContainerStatusCommandHandler : IRequestHandler<UpdateRouteContainerStatusCommand>
    {
        private readonly IUnitOfWork _uow;

        public UpdateRouteContainerStatusCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(UpdateRouteContainerStatusCommand command, CancellationToken cancellationToken)
        {
            var routeContainer = await _uow.RouteContainersRepository.GetByRouteAndContainerIds(command.RouteId, command.ContainerId);

            routeContainer.Empty = true;

            await _uow.RouteContainersRepository.SaveChangesAsync();
        }
    }
}
