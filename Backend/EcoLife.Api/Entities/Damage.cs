using System.Reflection.Metadata;

using EcoLife.Api.Dtos;

namespace EcoLife.Api.Entities
{
    public class DamageDto
    {
        public ContainerDto Container { get; set; }
        public DateOnly Date {get; set;}
        public string Description { get; set;}

        public Blob Image { get; set;}

    }
}
