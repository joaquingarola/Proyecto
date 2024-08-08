using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetDamagesStatsQueryHandler : IRequestHandler<GetDamagesStatsQuery, DamagesStatsDto>
    {
        private readonly IUnitOfWork _uow;

        public GetDamagesStatsQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<DamagesStatsDto> Handle(GetDamagesStatsQuery query, CancellationToken cancellationToken)
        {
            var startDateMap = new Dictionary<string, Func<DateTime?>>
            {
                { PeriodTypes.Weekly, () => DateTime.Now.AddDays(-7).Date },
                { PeriodTypes.Monthly, () => DateTime.Now.AddDays(-30).Date },
                { PeriodTypes.Quarterly, () => DateTime.Now.AddDays(-90).Date },
                { PeriodTypes.All, () => null },
            };

            DateTime? startDate = startDateMap[query.TimePeriod]();

            var damages = await _uow.DamageRepository.GetAllAsync();

            if (startDate.HasValue)
            {
                damages = damages.Where(d => d.Date >= startDate.Value).ToList();
            }

            return new DamagesStatsDto()
            {
                ContainerDamagesCount = damages.Count(x => x.Type == DamageType.Container),
                VehicleDamagesCount = damages.Count(x => x.Type == DamageType.Vehicle)
            };
        }
    }
}
