namespace EcoLife.Api.Entities
{
    public class RouteEntity
    {
        public int Id { get; set; }
        public int Periodicity { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public string WasteType { get; set; }
        public virtual ICollection<RouteContainers> RouteContainers { get; set; }

        public RouteEntity() { }
        public RouteEntity(string description, int periodicity, int quantity, string wasteType) 
        {
            Description = description;
            Periodicity = periodicity;
            Quantity = quantity;
            WasteType = wasteType;
            RouteContainers = new List<RouteContainers>();
        }
    }
}
