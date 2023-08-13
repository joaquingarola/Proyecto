using EcoLife.Api.Entities;

namespace EcoLife.Api.Dtos
{
    public class ContainerDto

    {
        
        public struct Coordinates
        {
            public double Latitude { get; set; }
            public double Lenght { get; set; }
        }

        public Zone Zone { get; set; } 
        public double Capacity { get; set; }
        public string Waste_Type { get; set; }
        public DateTime Last_Emptying { get; set; }
        public string State { get; set; }


    }
}
