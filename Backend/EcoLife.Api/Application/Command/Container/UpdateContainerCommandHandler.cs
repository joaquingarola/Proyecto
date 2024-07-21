using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using AutoMapper;
using MediatR;
using EcoLife.Api.Services.Interfaces;

namespace EcoLife.Api.Application
{
    public class UpdateContainerCommandHandler : IRequestHandler<UpdateContainerCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptimizationService _optimizationService;
        private readonly IMediator _mediator;

        public UpdateContainerCommandHandler(IUnitOfWork uow, IMapper mapper, IOptimizationService optimizationService, IMediator mediator)
        {
            _uow = uow;
            _mapper = mapper;
            _optimizationService = optimizationService;
            _mediator = mediator;
        }

        public async Task<int> Handle(UpdateContainerCommand command, CancellationToken cancellationToken)
        {
            var containerLocationChange = false;

            var editContainer = await _uow.ContainerRepository.GetByIdAsync(command.Id);

            if (ValidateLocationChange(editContainer, command))
                containerLocationChange = true;

            _mapper.Map(command, editContainer);

            var removeFromRoute = command.RouteId != null && command.Status == "Dañado";

            if (removeFromRoute)
            {
                editContainer.RouteId = null;

                var route = await _uow.RouteRepository.GetByIdAsync(command.RouteId.Value);

                route.Quantity -= 1;

                await _uow.RouteRepository.SaveChangesAsync();
            }

            var result = await _uow.ContainerRepository.Update(editContainer);

            if(removeFromRoute)
            {
                await _mediator.Send(new UpdateRecolectionDamagedContainerCommand() { ContainerId = editContainer.Id });
            }

            if (containerLocationChange)
            {
                await _mediator.Send(new UpdateRecolectionContainerLocationChangeCommand() { ContainerId = editContainer.Id });
            }

            return result.Id;
        }

        private static bool ValidateLocationChange(Container previousContainer, UpdateContainerCommand newContainer)
        {
            if (previousContainer.Latitude != newContainer.Latitude || previousContainer.Longitude != newContainer.Longitude)
                return true;

            return false;
        }
    }
}
