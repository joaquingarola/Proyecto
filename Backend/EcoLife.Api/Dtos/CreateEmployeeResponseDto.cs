namespace EcoLife.Api.Dtos
{
    public class CreateEmployeeResponseDto
    {
        public bool Success { get; set; }

        public string? Message { get; set; }
        
        public int? Id { get; set; }
    }
}
