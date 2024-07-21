using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetRouteByIdQueryHandler : IRequestHandler<GetRouteByIdQuery, RouteEntity>
    {
        private readonly IUnitOfWork _uow;

        public GetRouteByIdQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<RouteEntity> Handle(GetRouteByIdQuery query, CancellationToken cancellationToken)
        {
            var route = await _uow.RouteRepository.GetByIdWithContainers(query.RouteId);

            return route;
        }
    }
}
