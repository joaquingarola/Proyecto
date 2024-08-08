using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetCurrentStatsQueryHandler : IRequestHandler<GetCurrentStatsQuery, CurrentRecolectionStatsDto>
    {
        private readonly IUnitOfWork _uow;

        public GetCurrentStatsQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<CurrentRecolectionStatsDto> Handle(GetCurrentStatsQuery query, CancellationToken cancellationToken)
        {
            var recolections = await _uow.RecolectionRepository.GetAllAsync();

            return new CurrentRecolectionStatsDto()
            {
                PlanifiedCount = recolections.Count(x => x.Status == RecolectionStatus.Planified),
                InProgressCount = recolections.Count(x => x.Status == RecolectionStatus.Initiated || x.Status == RecolectionStatus.VehicleCenterComeBack),
                VehiclePendingCount = recolections.Count(x => x.Status == RecolectionStatus.PendingVehicle)
            };
        }
    }
}
