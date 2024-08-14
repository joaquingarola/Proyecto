namespace EcoLife.Api.Dtos
{
    public class DamagesStatsDto
    {
        public List<string> Labels { get; set; }
        public ChartDataDto Container { get; set; }
        public ChartDataDto Vehicle { get; set; }
    }
}
