using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetMaintenanceByIdQuery : IRequest<Maintenance>
    {
        public int MaintenanceId { get; set; }
    }
}
