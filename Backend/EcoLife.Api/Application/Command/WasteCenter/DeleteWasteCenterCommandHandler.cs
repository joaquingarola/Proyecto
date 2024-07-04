using EcoLife.Api.DataAccess.UnitOfWork;

using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteWasteCenterCommandHandler : IRequestHandler<DeleteWasteCenterCommand>
    {
        private readonly IUnitOfWork _uow;

        public DeleteWasteCenterCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(DeleteWasteCenterCommand command, CancellationToken cancellationToken)
        {
            await _uow.WasteCenterRepository.Delete(command.WasteCenterId);
        }
    }
}
