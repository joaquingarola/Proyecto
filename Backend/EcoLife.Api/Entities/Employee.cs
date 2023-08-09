namespace EcoLife.Api.Entities
{
    public class Employee
    {
        public int Id_Employee { get; set; }
        public int DNI { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }   
        public DateOnly  Birthdate { get; set; }
        public int PhoneNumber { get; set; }

        public DateOnly DateAdmission { get; set; }
        public string User { get; set; }
        public string Password { get; set; }




        
    }
}
