namespace EcoLife.Api.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int EmployeeId { get; set; }
        public bool IsFirstEntry { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
