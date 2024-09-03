using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetTopStatsQueryHandler : IRequestHandler<GetTopStatsQuery, TopRecolectionStatsDto>
    {
        private readonly IUnitOfWork _uow;

        public GetTopStatsQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<TopRecolectionStatsDto> Handle(GetTopStatsQuery query, CancellationToken cancellationToken)
        {
            var startDateMap = new Dictionary<string, Func<DateTime?>>
            {
                { PeriodTypes.Weekly, () => DateTime.Now.AddDays(-7).Date },
                { PeriodTypes.Monthly, () => DateTime.Now.AddDays(-30).Date },
                { PeriodTypes.Quarterly, () => DateTime.Now.AddDays(-90).Date },
                { PeriodTypes.All, () => null },
            };

            DateTime? startDate = startDateMap[query.TimePeriod]();

            var recolections = await _uow.RecolectionRepository.GetFinalizedWithVehicleAndEmployee();

            if (startDate.HasValue)
            {
                recolections = recolections.Where(d => d.RealEndDate >= startDate.Value).ToList();
            }

            var topEmployees = recolections
                .GroupBy(r => r.Employee)
                .Select(g => new TopEmployeeDto
                {
                    Name = $"{g.Key.Surname}, {g.Key.Name}",
                    Quantity = g.Count()
                })
                .OrderByDescending(e => e.Quantity)
                .Take(5)
                .ToList();

            var topVehicles = recolections
                .GroupBy(r => r.Vehicle)
                .Select(g => new TopVehicleDto
                {
                    Description = g.Key.Description,
                    Patent = g.Key.Patent,
                    Quantity = g.Count()
                })
                .OrderByDescending(v => v.Quantity)
                .Take(5)
                .ToList();

            return new TopRecolectionStatsDto()
            {
                TopEmployees = topEmployees,
                TopVehicles = topVehicles
            };
        }
    }
}
