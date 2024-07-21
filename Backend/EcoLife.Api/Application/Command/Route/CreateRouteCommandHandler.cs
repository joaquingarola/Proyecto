using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateRouteCommandHandler : IRequestHandler<CreateRouteCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMediator _mediator;

        public CreateRouteCommandHandler(IUnitOfWork uow, IMediator mediator)
        {
            _uow = uow;
            _mediator = mediator;   
        }

        public async Task<int> Handle(CreateRouteCommand command, CancellationToken cancellationToken)
        {
            var route = new RouteEntity(command.Description, command.Periodicity, command.Quantity, command.WasteType);

            var result = await _uow.RouteRepository.AddAndSaveAsync(route);

            foreach (var container in command.Containers)
            {
                await _mediator.Send(new SetContainerRouteIdCommand() { ContainerId = container.Id, RouteId = result.Id });
            }

            return result.Id;
        }
    }
}
