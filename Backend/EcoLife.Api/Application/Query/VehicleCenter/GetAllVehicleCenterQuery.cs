using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllVehicleCenterQuery : IRequest<IEnumerable<VehicleCenter>> { }
}
