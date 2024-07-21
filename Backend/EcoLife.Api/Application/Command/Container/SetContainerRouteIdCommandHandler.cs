using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application
{
    public class SetContainerRouteIdCommandHandler : IRequestHandler<SetContainerRouteIdCommand>
    {
        private readonly IUnitOfWork _uow;

        public SetContainerRouteIdCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(SetContainerRouteIdCommand command, CancellationToken cancellationToken)
        {
            var container = await _uow.ContainerRepository.GetByIdAsync(command.ContainerId);

            container.RouteId = command.RouteId;

            await _uow.ContainerRepository.SaveChangesAsync();
        }
    }
}
