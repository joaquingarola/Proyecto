using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllEmployeeQuery : IRequest<IEnumerable<Employee>> { }
}
