namespace EcoLife.Api.Dtos
{
    public class ContainerDto
    {
        public int? Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Capacity { get; set; }
        public string WasteType { get; set; }
        public DateTime? LastEmptying { get; set; }
        public string Status { get; set; }
        public int ZoneId { get; set; }
    }
}
