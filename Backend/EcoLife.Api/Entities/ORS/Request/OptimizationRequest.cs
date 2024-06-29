namespace EcoLife.Api.Entities.ORS.Request
{
    public class OptimizationRequest
    {
        public List<Job> jobs { get; set; }
        public List<Vehicle> vehicles { get; set; }
    }
}
