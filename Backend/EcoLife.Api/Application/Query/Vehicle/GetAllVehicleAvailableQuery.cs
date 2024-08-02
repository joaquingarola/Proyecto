using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllVehicleAvailableQuery : IRequest<IEnumerable<Vehicle>> { }
}
