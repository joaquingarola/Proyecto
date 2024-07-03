using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteEmployeeCommand : IRequest
    {
        public int EmployeeId { get; set; }
    }
}
