using EcoLife.Api.Entities;

namespace EcoLife.Api.Dtos
{
    public class RouteDto
    {
        public int Periodicity { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public string WasteType { get; set; }
        public ICollection<RouteContainersDto> RouteContainers { get; set; }  
    }
}
