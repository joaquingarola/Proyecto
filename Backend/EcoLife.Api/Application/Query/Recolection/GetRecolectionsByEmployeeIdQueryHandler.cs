using EcoLife.Api.Data.Constants;
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
            var types = new List<string>();

            if(query.Type == "Hoy")
            {
                recolections = await _uow.RecolectionRepository.GetByEmployeeIdAndDateWithEntities(query.EmployeeId);

                return recolections.OrderBy(x => x.EstimatedStartDate);
            }

            if (query.Type == RecolectionStatus.Planified)
            {
                types.Add(query.Type);
                types.Add(RecolectionStatus.PendingVehicle);
            }

            if(query.Type == RecolectionStatus.Finalized)
            {
                types.Add(query.Type);
                types.Add(RecolectionStatus.Canceled);
            }

            recolections = await _uow.RecolectionRepository.GetByEmployeeIdAndTypeWithEntities(query.EmployeeId, types);

            if (query.Type == RecolectionStatus.Finalized)
                return recolections.OrderByDescending(x => x.RealStartDate);


            return recolections.OrderBy(x => x.EstimatedStartDate);
        }
    }
}
