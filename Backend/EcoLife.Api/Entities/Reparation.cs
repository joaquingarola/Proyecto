namespace EcoLife.Api.Entities
{
    public class Reparation
    {
        public Container Container { get; set; }
        public DateOnly Date { get; set; }
        public string Description { get; set; }
    }
}
