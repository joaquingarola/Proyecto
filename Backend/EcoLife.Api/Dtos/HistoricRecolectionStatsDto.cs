namespace EcoLife.Api.Dtos
{
    public class HistoricRecolectionStatsDto
    {
        public List<string> Labels { get; set; }
        public ChartDataDto Finalized { get; set; }
        public ChartDataDto Canceled { get; set; }
    }
}
