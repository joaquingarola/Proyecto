namespace EcoLife.Api.Entities
{
    public class RecolectionContainers
    {
        public int Id { get; set; }
        public int ContainerId { get; set; }
        public int? Order { get; set; }
        public int RecolectionId { get; set; }
        public bool Empty { get; set; }
        public virtual Container? Container { get; set; }
        public virtual Recolection? Recolection { get; set; }

        public RecolectionContainers() { }
        public RecolectionContainers(Container container) 
        {
            Container = container;
            ContainerId = container.Id;
        }
    }
}
