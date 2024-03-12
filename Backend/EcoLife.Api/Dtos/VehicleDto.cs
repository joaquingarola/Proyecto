namespace EcoLife.Api.Dtos
{
    public class VehicleDto
    {
        public string Patent { get; set; }
        public string Description { get; set; }
        public int Model { get; set; }
        public DateTime BuyDate { get; set; }
        public int VehicleCenterId { get; set; }
    }
}
