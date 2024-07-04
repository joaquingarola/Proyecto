using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateVehicleCommandHandler : IRequestHandler<UpdateVehicleCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public UpdateVehicleCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(UpdateVehicleCommand command, CancellationToken cancellationToken)
        {
            var vehicle = _mapper.Map<Vehicle>(command);

            var result = await _uow.VehicleRepository.Update(vehicle);

            return result.Id;
        }
    }
}
