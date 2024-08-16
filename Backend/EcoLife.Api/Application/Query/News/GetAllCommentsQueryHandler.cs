using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllCommentsQueryHandler : IRequestHandler<GetAllCommentsQuery, IEnumerable<CitizenComment>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllCommentsQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<CitizenComment>> Handle(GetAllCommentsQuery query, CancellationToken cancellationToken)
        {
            var news = await _uow.CitizenCommentRepository.GetAllAsync();

            return news.OrderByDescending(x => x.Date);
        }
    }
}
