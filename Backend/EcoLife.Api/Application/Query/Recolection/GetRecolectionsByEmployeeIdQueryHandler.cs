using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetRecolectionsByEmployeeIdQueryHandler : IRequestHandler<GetRecolectionsByEmployeeIdQuery, IEnumerable<Recolection>>
    {
        private readonly IUnitOfWork _uow;

        public GetRecolectionsByEmployeeIdQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<Recolection>> Handle(GetRecolectionsByEmployeeIdQuery query, CancellationToken cancellationToken)
        {
            var recolections = new List<Recolection>();

            if(query.Type == "Hoy")
            {
                recolections = await _uow.RecolectionRepository.GetByEmployeeIdAndDateWithEntities(query.EmployeeId);

                return recolections.OrderBy(x => x.EstimatedStartDate);
            }

            recolections = await _uow.RecolectionRepository.GetByEmployeeIdAndTypeWithEntities(query.EmployeeId, query.Type);

            if (query.Type == "Finalizadas")
                return recolections.OrderByDescending(x => x.RealStartDate);


            return recolections.OrderBy(x => x.EstimatedStartDate);
        }
    }
}
