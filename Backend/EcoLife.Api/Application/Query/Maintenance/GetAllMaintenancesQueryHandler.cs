using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos.Response;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllMaintenancesQueryHandler : IRequestHandler<GetAllMaintenancesQuery, IEnumerable<MaintenanceResponseDto>>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public GetAllMaintenancesQueryHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<IEnumerable<MaintenanceResponseDto>> Handle(GetAllMaintenancesQuery query, CancellationToken cancellationToken)
        {
            var maintenances = await _uow.MaintenanceRepository.GetAllWithVehicleAsync();

            return _mapper.Map<List<MaintenanceResponseDto>>(maintenances);
        }
    }
}
