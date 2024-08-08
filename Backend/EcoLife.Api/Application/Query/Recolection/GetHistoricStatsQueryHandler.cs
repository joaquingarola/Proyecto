using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetHistoricStatsQueryHandler : IRequestHandler<GetHistoricStatsQuery, HistoricRecolectionStatsDto>
    {
        private readonly IUnitOfWork _uow;

        public GetHistoricStatsQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<HistoricRecolectionStatsDto> Handle(GetHistoricStatsQuery query, CancellationToken cancellationToken)
        {
            var startDateMap = new Dictionary<string, Func<DateTime?>>
            {
                { PeriodTypes.Weekly, () => DateTime.Now.AddDays(-7).Date },
                { PeriodTypes.Monthly, () => DateTime.Now.AddDays(-30).Date },
                { PeriodTypes.Quarterly, () => DateTime.Now.AddDays(-90).Date },
                { PeriodTypes.All, () => null },
            };

            DateTime? startDate = startDateMap[query.TimePeriod]();

            var recolections = await _uow.RecolectionRepository.GetAllAsync();

            if (startDate.HasValue)
            {
                recolections = recolections.Where(d => d.RealEndDate >= startDate.Value).ToList();
            }

            return new HistoricRecolectionStatsDto()
            {
                CanceledCount = recolections.Count(x => x.Status == RecolectionStatus.Canceled),
                FinalizedCount = recolections.Count(x => x.Status == RecolectionStatus.Finalized)
            };
        }
    }
}
