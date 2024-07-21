namespace EcoLife.Api.Entities
{
    public class Recolection
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime EstimatedStartDate { get; set; }
        public DateTime EstimatedEndDate { get; set; }
        public DateTime? RealStartDate { get; set; }
        public DateTime? RealEndDate { get; set; }
        public string Status { get; set; }
        public int VehicleId { get; set; }
        public int VehicleCenterId { get; set; }
        public int EmployeeId { get; set; }
        public int WasteCenterId { get; set; }
        public int RouteId { get; set; }
        public virtual VehicleCenter? VehicleCenter { get; set; }
        public virtual Vehicle? Vehicle { get; set; }
        public virtual Employee? Employee { get; set; }
        public virtual WasteCenter? WasteCenter { get; set; }
        public virtual RouteEntity? Route { get; set; }
        public virtual ICollection<RecolectionContainers> RecolectionContainers { get; set; }
    }
}
