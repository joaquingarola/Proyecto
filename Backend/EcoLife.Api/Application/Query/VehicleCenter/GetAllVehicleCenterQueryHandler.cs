using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllVehicleCenterQueryHandler : IRequestHandler<GetAllVehicleCenterQuery, IEnumerable<VehicleCenter>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllVehicleCenterQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<VehicleCenter>> Handle(GetAllVehicleCenterQuery query, CancellationToken cancellationToken)
        {
            return await _uow.VehicleCenterRepository.GetAllAsync();
        }
    }
}
