using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteContainerCommandHandler : IRequestHandler<DeleteContainerCommand>
    {
        private readonly IUnitOfWork _uow;

        public DeleteContainerCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(DeleteContainerCommand command, CancellationToken cancellationToken)
        {
            var container = await _uow.ContainerRepository.GetByIdAsync(command.ContainerId);

            if (container.RouteId != null)
            {
                var route = await _uow.RouteRepository.GetByIdAsync(container.RouteId.Value);

                route.Quantity -= 1;

                await _uow.RouteRepository.SaveChangesAsync();
            }

            await _uow.ContainerRepository.Delete(command.ContainerId);
        }
    }
}
