using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetInProgressByEmployeeIdQueryHandler : IRequestHandler<GetInProgressByEmployeeIdQuery, Recolection?>
    {
        private readonly IUnitOfWork _uow;

        public GetInProgressByEmployeeIdQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<Recolection?> Handle(GetInProgressByEmployeeIdQuery query, CancellationToken cancellationToken)
        {
            var employeeRecolections = await _uow.RecolectionRepository.GetByEmployeeIdWithEntities(query.EmployeeId);

            return employeeRecolections.FirstOrDefault(x => x.Status == "Iniciada" || x.Status == "Volviendo a centro de vehículos");
        }
    }
}
