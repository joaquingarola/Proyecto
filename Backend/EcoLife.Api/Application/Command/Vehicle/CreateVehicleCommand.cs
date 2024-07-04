﻿using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateVehicleCommand : IRequest<int>
    {
        public string Patent { get; set; }
        public string Description { get; set; }
        public int Model { get; set; }
        public DateTime BuyDate { get; set; }
        public int VehicleCenterId { get; set; }
    }
}
