namespace EcoLife.Api.Entities
{
    public class CitizenComment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
    }
}
