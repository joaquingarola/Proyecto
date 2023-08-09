namespace EcoLife.Api.Entities
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Patent { get; set; }
        public string Description { get; set; }
        public int Model { get; set; }
        public DateTime BuyDate { get; set; }
    }
}
