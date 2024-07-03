using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllContainersQuery : IRequest<IEnumerable<Container>> { }
}
