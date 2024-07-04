using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateVehicleCenterCommand : IRequest<int>
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
    }
}
