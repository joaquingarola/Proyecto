using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateMaintenanceCommand : IRequest<int>
    {
        public int VehicleId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
    }
}
