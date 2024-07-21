using MediatR;

namespace EcoLife.Api.Application
{
    public class SetContainerRouteIdCommand : IRequest
    {
        public int ContainerId { get; set; }
        public int? RouteId { get; set; }
    }
}
