using MediatR;

namespace EcoLife.Api.Application.Command.Maintenance
{
    public class CompleteMaintenanceCommand : IRequest<int>
    {
        public int MaintenanceId { get; set; }
        public DateTime EndDate { get; set; }
    }
}
