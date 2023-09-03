namespace EcoLife.Api.Dtos
{
    public class EmployeeDto
    {
        public string Dni { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Birthdate { get; set; }
        public DateTime AdmissionDate { get; set; }
        public int RoleId { get; set; }
    }
}
