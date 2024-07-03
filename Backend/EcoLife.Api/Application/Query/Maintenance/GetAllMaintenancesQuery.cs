using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllMaintenancesQuery : IRequest<IEnumerable<MaintenanceResponseDto>> { }
}
