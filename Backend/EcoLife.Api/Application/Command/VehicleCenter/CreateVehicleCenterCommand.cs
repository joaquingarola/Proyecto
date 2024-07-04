using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateVehicleCenterCommand : IRequest<int>
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
    }
}
