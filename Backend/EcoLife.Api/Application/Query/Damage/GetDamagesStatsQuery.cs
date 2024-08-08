using EcoLife.Api.Dtos;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetDamagesStatsQuery : IRequest<DamagesStatsDto> 
    {
        public string TimePeriod { get; set; }
    }
}
