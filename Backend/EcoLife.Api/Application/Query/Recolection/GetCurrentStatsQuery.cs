using EcoLife.Api.Dtos;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetCurrentStatsQuery : IRequest<CurrentRecolectionStatsDto> { }
}
