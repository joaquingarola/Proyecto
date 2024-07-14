using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateRouteContainerStatusCommand : IRequest
    {
        public int RouteId { get; set; }
        public int ContainerId { get; set; }
    }
}
