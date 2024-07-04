using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateRouteCommand : IRequest<int>
    {
        public int Id { get; set; }
        public int Periodicity { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public string WasteType { get; set; }
        public virtual ICollection<RouteContainers> RouteContainers { get; set; }
    }
}
