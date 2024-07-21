using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateRouteCommand : IRequest<int>
    {
        public int Periodicity { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public string WasteType { get; set; }
        public ICollection<Container> Containers { get; set; }
    }
}
