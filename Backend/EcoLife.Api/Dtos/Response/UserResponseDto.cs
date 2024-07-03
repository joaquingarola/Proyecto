using EcoLife.Api.Entities;

namespace EcoLife.Api.Dtos.Response
{
    public class UserResponseDto
    {
        public bool Success { get; set; }
        public string? Token { get; set; }
        public bool? IsFirstEntry { get; set; }
        public Employee? Employee { get; set; }
    }
}
