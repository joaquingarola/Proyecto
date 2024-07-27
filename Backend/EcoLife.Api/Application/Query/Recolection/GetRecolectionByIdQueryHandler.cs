using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetRecolectionByIdQueryHandler : IRequestHandler<GetRecolectionByIdQuery, Recolection>
    {
        private readonly IUnitOfWork _uow;

        public GetRecolectionByIdQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<Recolection> Handle(GetRecolectionByIdQuery query, CancellationToken cancellationToken)
        {
            return await _uow.RecolectionRepository.GetByIdWithEntities(query.RecolectionId);
        }
    }
}
