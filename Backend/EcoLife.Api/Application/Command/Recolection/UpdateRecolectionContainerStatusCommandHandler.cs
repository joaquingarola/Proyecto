using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application.Command.Recolection
{
    public class UpdateRecolectionContainerStatusCommandHandler : IRequestHandler<UpdateRecolectionContainerStatusCommand>
    {
        private readonly IUnitOfWork _uow;

        public UpdateRecolectionContainerStatusCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(UpdateRecolectionContainerStatusCommand command, CancellationToken cancellationToken)
        {
            var routeContainer = await _uow.RecolectionContainersRepository.GetByRecolectionAndContainerIds(command.RecolectionId, command.ContainerId);

            routeContainer.Empty = true;

            await _uow.RecolectionContainersRepository.SaveChangesAsync();
        }
    }
}
