﻿namespace EcoLife.Api.Entities.Base
{
    public class BaseCenter
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
    }
}
