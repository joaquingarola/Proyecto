namespace EcoLife.Api.Entities.ORS.Response
{
    public class RouteORS
    {
        public int vehicle { get; set; }
        public int cost { get; set; }
        public int[] delivery { get; set; }
        public int[] amount { get; set; }
        public int[] pickup { get; set; }
        public int setup { get; set; }
        public int service { get; set; }
        public int duration { get; set; }
        public int waiting_time { get; set; }
        public int priority { get; set; }
        public List<Step> steps { get; set; }
        public List<object> violations { get; set; }
    }
}
