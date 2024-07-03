using EcoLife.Api.DataAccess.UnitOfWork;

using MediatR;

namespace EcoLife.Api.Application.Command.News
{
    public class DeleteNewCommandHandler : IRequestHandler<DeleteNewCommand>
    {
        private readonly IUnitOfWork _uow;

        public DeleteNewCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(DeleteNewCommand command, CancellationToken cancellationToken)
        {
            await _uow.NewRepository.Delete(command.NewId);
        }
    }
}
