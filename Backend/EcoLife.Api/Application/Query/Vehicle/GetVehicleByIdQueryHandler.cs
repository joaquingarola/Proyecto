using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetVehicleByIdQueryHandler : IRequestHandler<GetVehicleByIdQuery, Vehicle>
    {
        private readonly IUnitOfWork _uow;

        public GetVehicleByIdQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<Vehicle> Handle(GetVehicleByIdQuery query, CancellationToken cancellationToken)
        {
            return await _uow.VehicleRepository.GetByIdAsync(query.VehicleId);
        }
    }
}
