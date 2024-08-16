using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteCitizenCommentCommandHandler : IRequestHandler<DeleteCitizenCommentCommand>
    {
        private readonly IUnitOfWork _uow;

        public DeleteCitizenCommentCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(DeleteCitizenCommentCommand command, CancellationToken cancellationToken)
        {
            await _uow.CitizenCommentRepository.Delete(command.CommentId);
        }
    }
}
