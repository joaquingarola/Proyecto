namespace EcoLife.Api.Entities.ORS.Request
{
    public class Vehicle
    {
        public int id { get; set; }
        public string profile { get; set; }
        public double[] start { get; set; }
        public double[] end { get; set; }
        public int[] capacity { get; set; }
    }
}
