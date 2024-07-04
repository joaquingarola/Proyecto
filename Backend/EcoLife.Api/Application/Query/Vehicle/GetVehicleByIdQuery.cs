using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetVehicleByIdQuery : IRequest<Vehicle>
    {
        public int VehicleId { get; set; }
    }
}
