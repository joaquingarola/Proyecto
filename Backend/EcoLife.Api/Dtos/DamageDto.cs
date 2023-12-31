﻿using System.Reflection.Metadata;

namespace EcoLife.Api.Dtos
{
    public class DamageDto
    {
        public ContainerDto Container { get; set; }
        public DateOnly Date {get; set;}
        public string Description { get; set;}

        public Blob Image { get; set;}

    }
}
