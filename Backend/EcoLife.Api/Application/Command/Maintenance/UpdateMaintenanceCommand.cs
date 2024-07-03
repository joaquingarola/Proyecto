using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateMaintenanceCommand : IRequest<int>
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public string Description { get; set; }
    }
}
