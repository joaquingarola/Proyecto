namespace EcoLife.Api.Entities.ORS.Response
{
    public class Summary
    {
        public int cost { get; set; }
        public int routes { get; set; }
        public int unassigned { get; set; }
        public int[] delivery { get; set; }
        public int[] amount { get; set; }
        public int[] pickup { get; set; }
        public int setup { get; set; }
        public int service { get; set; }
        public int duration { get; set; }
        public int waiting_time { get; set; }
        public int priority { get; set; }
        public List<object> violations { get; set; }
        public ComputingTimes computing_times { get; set; }
    }
}
