using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateVehicleCenterCommandHandler : IRequestHandler<UpdateVehicleCenterCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public UpdateVehicleCenterCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(UpdateVehicleCenterCommand command, CancellationToken cancellationToken)
        {
            var vehicleCenter = _mapper.Map<VehicleCenter>(command);
            
            var result = await _uow.VehicleCenterRepository.Update(vehicleCenter);
            
            return result.Id;
        }
    }
}
