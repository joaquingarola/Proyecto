using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetRouteByIdQuery : IRequest<RouteEntity>
    {
        public int RouteId { get; set; }
    }
}
