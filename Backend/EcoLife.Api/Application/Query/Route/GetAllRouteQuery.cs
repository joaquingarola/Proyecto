using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllRouteQuery : IRequest<IEnumerable<RouteEntity>> { }
}
