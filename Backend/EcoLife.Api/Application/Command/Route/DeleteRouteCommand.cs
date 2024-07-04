using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteRouteCommand : IRequest
    {
        public int RouteId { get; set; }
    }
}
