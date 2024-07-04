using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteVehicleCommand : IRequest
    {
        public int VehicleId { get; set; }
    }
}
