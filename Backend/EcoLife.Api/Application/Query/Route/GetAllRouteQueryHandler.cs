using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllRouteQueryHandler : IRequestHandler<GetAllRouteQuery, IEnumerable<RouteEntity>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllRouteQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<RouteEntity>> Handle(GetAllRouteQuery query, CancellationToken cancellationToken)
        {
            return await _uow.RouteRepository.GetAllWithContainers();
        }
    }
}
