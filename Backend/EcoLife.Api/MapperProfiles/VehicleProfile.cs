using AutoMapper;

using EcoLife.Api.Application;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class VehicleProfile : Profile
    {
        public VehicleProfile()
        {
            CreateMap<CreateVehicleCommand, Vehicle>();

            CreateMap<UpdateVehicleCommand, Vehicle>();
        }
    }
}
