using System.Reflection.Metadata;

namespace EcoLife.Api.Entities
{
    public class Damage
    {
        public Container Container { get; set; }
        public DateOnly Date {get; set;}
        public string Description { get; set;}

        public Blob Image { get; set;}

    }
}
