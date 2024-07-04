using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateVehicleCenterCommandHandler : IRequestHandler<CreateVehicleCenterCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CreateVehicleCenterCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(CreateVehicleCenterCommand command, CancellationToken cancellationToken)
        {
            var vehicleCenter = _mapper.Map<VehicleCenter>(command);

            var result = await _uow.VehicleCenterRepository.AddAndSaveAsync(vehicleCenter);

            return result.Id;
        }
    }
}
