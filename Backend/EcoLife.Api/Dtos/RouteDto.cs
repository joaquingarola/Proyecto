using EcoLife.Api.Entities;

namespace EcoLife.Api.Dtos
{
    public class RouteDto
    {
        public int? Id { get; set; }
        public int Periodicity { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public ICollection<Container> Containers { get; set; }  
    }
}
