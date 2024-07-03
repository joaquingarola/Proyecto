using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllRecolectorsQuery : IRequest<IEnumerable<Employee>> { }
}
