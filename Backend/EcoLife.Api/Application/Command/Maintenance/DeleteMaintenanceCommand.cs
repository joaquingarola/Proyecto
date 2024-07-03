using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteMaintenanceCommand : IRequest
    {
        public int MaintenanceId { get; set; }
    }
}
