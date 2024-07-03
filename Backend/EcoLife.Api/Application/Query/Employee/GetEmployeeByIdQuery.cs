using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetEmployeeByIdQuery : IRequest<Employee>
    {
        public int EmployeeId { get; set; }
    }
}
