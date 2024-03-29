﻿namespace EcoLife.Api.Entities
{
    public class RouteEntity
    {
        public int Id { get; set; }
        public int Periodicity { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public virtual ICollection<Container> Containers { get; set; }

        public RouteEntity() { }
        public RouteEntity(string description, int periodicity, int quantity) 
        {
            Description = description;
            Periodicity = periodicity;
            Quantity = quantity;
            Containers = new List<Container>();
        }
        public RouteEntity(ICollection<Container> containers)
        {
            Containers = containers;
        }
    }
}
