﻿namespace EcoLife.Api.Entities
{
    public class Container
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Capacity { get; set; }
        public string WasteType { get; set; }
        public DateTime LastEmptying { get; set; }
        public string Status { get; set; }
        public int ZoneId { get; set; }
        public virtual Zone? Zone { get; set; }
    }
}
