﻿using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllVehiclesQuery : IRequest<IEnumerable<Vehicle>> { }
}
