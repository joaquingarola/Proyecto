using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateMaintenanceCommandHandler : IRequestHandler<CreateMaintenanceCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CreateMaintenanceCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(CreateMaintenanceCommand command, CancellationToken cancellationToken)
        {
            var maintenance = _mapper.Map<Maintenance>(command);

            var result = await _uow.MaintenanceRepository.AddAndSaveAsync(maintenance);

            return result.Id;
        }
    }
}
