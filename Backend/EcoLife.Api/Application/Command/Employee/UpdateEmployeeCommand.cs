using EcoLife.Api.Dtos.Response;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateEmployeeCommand : IRequest<CreateEmployeeResponseDto>
    {
        public int Id { get; set; }
        public string Dni { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Birthdate { get; set; }
        public DateTime AdmissionDate { get; set; }
        public int RoleId { get; set; }
        public virtual Role? Role { get; set; }
    }
}
