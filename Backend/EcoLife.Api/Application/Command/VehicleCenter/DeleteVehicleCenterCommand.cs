using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteVehicleCenterCommand : IRequest
    {
        public int VehicleCenterId { get; set; }
    }
}
