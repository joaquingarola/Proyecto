using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using AutoMapper;
using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateContainerCommandHandler : IRequestHandler<UpdateContainerCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public UpdateContainerCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(UpdateContainerCommand command, CancellationToken cancellationToken)
        {
            var editContainer = _mapper.Map<Container>(command);

            var result = await _uow.ContainerRepository.Update(editContainer);

            if (command.RouteContainer != null && command.Status == "Dañado")
            {
                var route = await _uow.RouteRepository.GetByIdWithRouteContainers(command.RouteContainer!.RouteId);

                var routeContainer = route.RouteContainers.First(x => x.ContainerId == command.Id);

                route.RouteContainers.Remove(routeContainer);

                route.Quantity -= 1;

                await _uow.RouteRepository.SaveChangesAsync();
            }

            return result.Id;
        }
    }
}
