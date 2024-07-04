using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateVehicleCommandHandler : IRequestHandler<CreateVehicleCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CreateVehicleCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(CreateVehicleCommand command, CancellationToken cancellationToken)
        {
            var vehicle = _mapper.Map<Vehicle>(command);

            var result = await _uow.VehicleRepository.AddAndSaveAsync(vehicle);

            return result.Id;
        }
    }
}
