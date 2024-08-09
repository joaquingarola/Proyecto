using EcoLife.Api.Dtos;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetTopStatsQuery : IRequest<TopRecolectionStatsDto>
    {
        public string TimePeriod { get; set; }
    }
}
