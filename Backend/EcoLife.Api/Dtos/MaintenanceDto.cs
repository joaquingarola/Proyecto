namespace EcoLife.Api.Entities
{
    public class MaintenanceDto
    {
        public Vehicle Vehicle { get; set; }
        public DateOnly Date { get; set; }
        public String Description { get; set; }
    }
}
