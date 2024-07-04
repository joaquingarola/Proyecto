using EcoLife.Api.DataAccess.UnitOfWork;

using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteRecolectionCommandHandler : IRequestHandler<DeleteRecolectionCommand>
    {
        private readonly IUnitOfWork _uow;

        public DeleteRecolectionCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(DeleteRecolectionCommand command, CancellationToken cancellationToken)
        {
            await _uow.RecolectionRepository.Delete(command.RecolectionId);
        }
    }
}
