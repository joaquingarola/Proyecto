using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllContainersWithoutRouteQueryHandler : IRequestHandler<GetAllContainersWithoutRouteQuery, IEnumerable<Container>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllContainersWithoutRouteQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<Container>> Handle(GetAllContainersWithoutRouteQuery query, CancellationToken cancellationToken)
        {
            return await _uow.ContainerRepository.GetAllWithRouteAsync();
        }
    }
}
