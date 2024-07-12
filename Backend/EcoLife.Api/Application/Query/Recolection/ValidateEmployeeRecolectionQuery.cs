using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class ValidateEmployeeRecolectionQuery : IRequest<bool>
    {
        public int EmployeeId { get; set; }
    }
}
