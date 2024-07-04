using MediatR;

namespace EcoLife.Api.Application
{
    public class CompleteMaintenanceCommand : IRequest<int>
    {
        public int MaintenanceId { get; set; }
        public DateTime EndDate { get; set; }
    }
}
