namespace EcoLife.Api.Entities.ORS.Request
{
    public class Job
    {
        public int id { get; set; }
        public int[] delivery { get; set; }
        public double[] location { get; set; }
    }
}
