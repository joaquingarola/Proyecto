using EcoLife.Api.Entities;

namespace EcoLife.Api.Dtos.Response
{
    public class MaintenanceResponseDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
        public Vehicle Vehicle { get; set; }
        public string Status { get; set; }
    }
}
