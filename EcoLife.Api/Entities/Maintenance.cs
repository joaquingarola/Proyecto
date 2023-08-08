namespace EcoLife.Api.Entities
{
    public class Maintenance
    {
        public Vehicle Vehicle { get; set; }
        public DateOnly Date { get; set; }
        public String Description { get; set; }
    }
}
