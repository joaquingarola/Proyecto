namespace EcoLife.Api.Entities
{
    public class Maintenance
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
        public virtual Vehicle? Vehicle { get; set; }
    }
}
