namespace EcoLife.Api.Dtos
{
    public class RecolectionDto
    {
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public string? Status { get; set; }
        public int VehicleId { get; set; }
        public int VehicleCenterId { get; set; }
        public int EmployeeId { get; set; }
        public int WasteCenterId { get; set; }
        public int RouteId { get; set; }
    }
}
