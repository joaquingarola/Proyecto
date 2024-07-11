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
            var recolections = await _uow.RecolectionRepository.GetByEmployeeIdWithEntities(query.EmployeeId);

            if (query.Type == "Finalizadas")
                return recolections.Where(x => x.Status == "Finalizada").OrderByDescending(x => x.RealStartDate);

            if (query.Type == "Planificadas")
                return recolections.Where(x => x.Status == "Planificada").OrderBy(x => x.EstimatedStartDate);

            return recolections.Where(x => x.EstimatedStartDate.Date == DateTime.Now.Date).OrderBy(x => x.EstimatedStartDate);
        }
    }
}
