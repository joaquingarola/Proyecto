using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateVehicleCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string Patent { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int Model { get; set; }
        public DateTime BuyDate { get; set; }
        public int VehicleCenterId { get; set; }
    }
}
