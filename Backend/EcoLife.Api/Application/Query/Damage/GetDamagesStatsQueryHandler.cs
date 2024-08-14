using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using EcoLife.Api.Extensions;

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

            var (VehicleLabels, VehicleCounts) = GenerateChartData(query.TimePeriod, damages, DamageType.Vehicle);
            var (ContainerLabels, ContainerCounts) = GenerateChartData(query.TimePeriod, damages, DamageType.Container);

            return new DamagesStatsDto()
            {
                Labels = VehicleLabels,
                Vehicle = new ChartDataDto { LabelType = $"{DamageType.Vehicle}s", Counts = VehicleCounts },
                Container = new ChartDataDto { LabelType = $"{DamageType.Container}es", Counts = ContainerCounts }
            };
        }

        private static (List<string> Labels, List<int> Counts) GenerateChartData(string timePeriod, List<Damage> damages, string type)
        {
            var labels = new List<string>();
            var counts = new List<int>();

            switch (timePeriod)
            {
                case "Weekly":
                    for (int i = 7; i >= 1; i--)
                    {
                        var date = DateTime.Now.AddDays(-i).Date;
                        var count = damages.Count(d => d.Type == type && d.Date.Date == date);
                        labels.Add(date.ToString("d MMM"));
                        counts.Add(count);
                    }
                    break;

                case "Monthly":
                    for (int i = 6; i >= 1; i--)
                    {
                        var startDateRange = DateTime.Now.AddDays(-i * 5).Date;
                        var endDateRange = startDateRange.AddDays(4).Date;
                        var count = damages.Count(d => d.Type == type && d.Date.Date >= startDateRange && d.Date.Date <= endDateRange);
                        labels.Add($"{startDateRange:d MMM} - {endDateRange:d MMM}");
                        counts.Add(count);
                    }
                    break;

                case "Quarterly":
                    for (int i = 6; i >= 1; i--)
                    {
                        var startDateRange = DateTime.Now.AddDays(-i * 15).Date;
                        var endDateRange = startDateRange.AddDays(14).Date;
                        var count = damages.Count(d => d.Type == type && d.Date.Date >= startDateRange && d.Date.Date <= endDateRange);
                        labels.Add($"{startDateRange:d MMM} - {endDateRange:d MMM}");
                        counts.Add(count);
                    }
                    break;

                case "All":
                    if (damages.Any())
                    {
                        DateTime firstRecolectionDate = damages.Min(d => d.Date).Date;
                        DateTime currentMonth = DateTime.Now;

                        for (var date = new DateTime(firstRecolectionDate.Year, firstRecolectionDate.Month, 1); date <= currentMonth; date = date.AddMonths(1))
                        {
                            var count = damages.Count(d => d.Type == type && d.Date.Year == date.Year && d.Date.Month == date.Month);
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
