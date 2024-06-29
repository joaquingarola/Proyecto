namespace EcoLife.Api.Entities.ORS.Response
{
    public class OptimizationResponse
    {
        public int code { get; set; }
        public Summary summary { get; set; }
        public List<object> unassigned { get; set; }
        public List<RouteORS> routes { get; set; }
    }
}
