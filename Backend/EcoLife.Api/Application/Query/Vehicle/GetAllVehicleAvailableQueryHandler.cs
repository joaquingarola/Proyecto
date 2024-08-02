using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllVehicleAvailableQueryHandler : IRequestHandler<GetAllVehicleAvailableQuery, IEnumerable<Vehicle>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllVehicleAvailableQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<Vehicle>> Handle(GetAllVehicleAvailableQuery query, CancellationToken cancellationToken)
        {
            var vehicles = await _uow.VehicleRepository.GetAllWithCenter();

            return vehicles.Where(x => x.Status == VehicleStatus.Available);
        }
    }
}
