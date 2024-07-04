using EcoLife.Api.Dtos.Response;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllMaintenancesQuery : IRequest<IEnumerable<MaintenanceResponseDto>> { }
}
