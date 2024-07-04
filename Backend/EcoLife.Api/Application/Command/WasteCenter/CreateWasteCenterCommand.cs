using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateWasteCenterCommand : IRequest<int>
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public string WasteType { get; set; }
    }
}
