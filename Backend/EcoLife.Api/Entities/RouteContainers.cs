namespace EcoLife.Api.Entities
{
    public class RouteContainers
    {
        public int Id { get; set; }
        public int ContainerId { get; set; }
        public int? Order { get; set; }
        public int RouteId { get; set; }
        public bool Empty { get; set; }
        public virtual Container? Container { get; set; }
        public virtual RouteEntity? Route { get; set; }
    }
}
