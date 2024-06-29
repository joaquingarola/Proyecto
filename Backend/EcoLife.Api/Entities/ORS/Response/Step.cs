namespace EcoLife.Api.Entities.ORS.Response
{
    public class Step
    {
        public string type { get; set; }
        public double[] location { get; set; }
        public int setup { get; set; }
        public int service { get; set; }
        public int waiting_time { get; set; }
        public int[] load { get; set; }
        public int arrival { get; set; }
        public int duration { get; set; }
        public List<object> violations { get; set; }
        public int? id { get; set; }
        public int? job { get; set; }
    }
}
