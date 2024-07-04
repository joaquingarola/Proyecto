using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllNewsQueryHandler : IRequestHandler<GetAllNewsQuery, IEnumerable<New>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllNewsQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<New>> Handle(GetAllNewsQuery query, CancellationToken cancellationToken)
        {
            var news = await _uow.NewRepository.GetAllAsync();
            
            return news.OrderByDescending(x => x.Date);
        }
    }
}
