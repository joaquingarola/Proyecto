namespace EcoLife.Api.Entities
{
    public class Damage
    {
        public int Id { get; set; }
        public DateTime Date {get; set;}
        public string? Type { get; set;}

        public Damage() { }

        public Damage(string type)
        {
            Type = type;
            Date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time"));
        }
    }
}
