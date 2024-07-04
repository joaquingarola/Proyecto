using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application.Command.Route
{
    public class DeleteRouteCommandHandler : IRequestHandler<DeleteRouteCommand>
    {
        private readonly IUnitOfWork _uow;

        public DeleteRouteCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(DeleteRouteCommand command, CancellationToken cancellationToken)
        {
            var route = await _uow.RouteRepository.GetByIdWithContainers(command.RouteId);

            _uow.RouteRepository.Remove(route);

            await _uow.RouteRepository.SaveChangesAsync();
        }
    }
}
