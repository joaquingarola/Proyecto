using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetRecolectionsByEmployeeIdQuery : IRequest<IEnumerable<Recolection>>
    {
        public int EmployeeId { get; set; }
        public string Type { get; set; }
    }
}
