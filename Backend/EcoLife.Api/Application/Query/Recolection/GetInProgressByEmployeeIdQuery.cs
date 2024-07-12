using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetInProgressByEmployeeIdQuery : IRequest<Recolection?>
    {
        public int EmployeeId { get; set; }
    }
}
