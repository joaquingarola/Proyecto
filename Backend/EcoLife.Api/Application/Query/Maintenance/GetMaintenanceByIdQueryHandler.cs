using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetMaintenanceByIdQueryHandler : IRequestHandler<GetMaintenanceByIdQuery, Maintenance>
    {
        private readonly IUnitOfWork _uow;

        public GetMaintenanceByIdQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<Maintenance> Handle(GetMaintenanceByIdQuery query, CancellationToken cancellationToken)
        {
            return await _uow.MaintenanceRepository.GetByIdAsync(query.MaintenanceId);
        }
    }
}
