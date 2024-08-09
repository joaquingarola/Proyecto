namespace EcoLife.Api.Dtos
{
    public class TopRecolectionStatsDto
    {
        public IEnumerable<TopEmployeeDto> TopEmployees { get; set; }
        public IEnumerable<TopVehicleDto> TopVehicles { get; set; }
    }
}
