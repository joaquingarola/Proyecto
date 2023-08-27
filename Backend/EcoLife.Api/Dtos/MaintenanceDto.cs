namespace EcoLife.Api.Dtos
{
    public class MaintenanceDto
    {
        public int VehicleId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
    }
}
