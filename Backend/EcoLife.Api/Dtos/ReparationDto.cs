namespace EcoLife.Api.Dtos
{
    public class ReparationDto
    {
        public ContainerDto Container { get; set; }
        public DateOnly Date { get; set; }
        public string Description { get; set; }
    }
}
