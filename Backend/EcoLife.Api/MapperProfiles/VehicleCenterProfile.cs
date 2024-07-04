using AutoMapper;

using EcoLife.Api.Application;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class VehicleCenterProfile : Profile
    {
        public VehicleCenterProfile()
        {
            CreateMap<CreateVehicleCenterCommand, VehicleCenter>();

            CreateMap<UpdateVehicleCenterCommand, VehicleCenter>();
        }
    }
}
