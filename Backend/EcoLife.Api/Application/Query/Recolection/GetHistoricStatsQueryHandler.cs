using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using EcoLife.Api.Extensions;

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

            var (FinalizedLabels, FinalizedCounts) = GenerateChartData(query.TimePeriod, recolections, RecolectionStatus.Finalized);
            var (CanceledLabels, CanceledCounts) = GenerateChartData(query.TimePeriod, recolections, RecolectionStatus.Canceled);

            return new HistoricRecolectionStatsDto()
            {
                Labels = FinalizedLabels,
                Canceled = new ChartDataDto { LabelType = $"{RecolectionStatus.Canceled}s", Counts = CanceledCounts },
                Finalized = new ChartDataDto { LabelType = $"{RecolectionStatus.Finalized}s", Counts = FinalizedCounts }
            };
        }

        private static (List<string> Labels, List<int> Counts) GenerateChartData(string timePeriod, List<Recolection> recolections, string status)
        {
            var labels = new List<string>();
            var counts = new List<int>();

            switch (timePeriod)
            {
                case "Weekly":
                    for (int i = 7; i >= 1; i--)
                    {
                        var date = DateTime.Now.AddDays(-i).Date;
                        var count = recolections.Count(r => r.Status == status && r.RealEndDate!.Value.Date == date);
                        labels.Add(date.ToString("d MMM"));
                        counts.Add(count);
                    }
                    break;

            case "Monthly":
                for (int i = 6; i >= 1; i--)
                {
                    var startDateRange = DateTime.Now.AddDays(-i * 5).Date;
                    var endDateRange = startDateRange.AddDays(4).Date;
                    var count = recolections.Count(r => r.Status == status && r.RealEndDate!.Value.Date >= startDateRange && r.RealEndDate!.Value.Date <= endDateRange);
                    labels.Add($"{startDateRange:d MMM} - {endDateRange:d MMM}");
                    counts.Add(count);
                }
                break;

            case "Quarterly":
                for (int i = 6; i >= 1; i--)
                {
                    var startDateRange = DateTime.Now.AddDays(-i * 15).Date;
                    var endDateRange = startDateRange.AddDays(14).Date;
                    var count = recolections.Count(r => r.Status == status && r.RealEndDate!.Value.Date >= startDateRange && r.RealEndDate!.Value.Date <= endDateRange);
                    labels.Add($"{startDateRange:d MMM} - {endDateRange:d MMM}");
                    counts.Add(count);
                }
                break;

            case "All":
                if (recolections.Any())
                {
                    DateTime firstRecolectionDate = recolections.Min(r => r.RealEndDate)!.Value.Date;
                    DateTime currentMonth = DateTime.Now;

                    for (var date = new DateTime(firstRecolectionDate.Year, firstRecolectionDate.Month, 1); date <= currentMonth; date = date.AddMonths(1))
                    {
                        var count = recolections.Count(r => r.Status == status && r.RealEndDate!.Value.Year == date.Year && r.RealEndDate!.Value.Month == date.Month);
                        labels.Add(date.ToString("MMMM").ToTitleCase());
                        counts.Add(count);
                    }
                }
                break;
            }

            return (labels, counts);
        }
    }
}
