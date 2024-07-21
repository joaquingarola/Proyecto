using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateContainerCommand : IRequest<int>
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Capacity { get; set; }
        public string Address { get; set; }
        public string WasteType { get; set; }
        public DateTime? LastEmptying { get; set; }
        public string? Status { get; set; }
        public string Zone { get; set; }
        public int? RouteId { get; set; }
    }
}
