using MediatR;

namespace EcoLife.Api.Application
{
    public class DamagedVehicleCommand : IRequest
    {
        public int VehicleId { get; set; }
    }
}
