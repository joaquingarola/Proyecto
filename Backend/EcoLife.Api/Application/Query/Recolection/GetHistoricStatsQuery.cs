using EcoLife.Api.Dtos;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetHistoricStatsQuery : IRequest<HistoricRecolectionStatsDto>
    {
        public string TimePeriod { get; set; }
    }
}
