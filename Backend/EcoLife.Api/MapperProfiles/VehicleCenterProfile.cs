using AutoMapper;

using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class VehicleCenterProfile : Profile
    {
        public VehicleCenterProfile()
        {
            CreateMap<VehicleCenterDto, VehicleCenter>();
        }
    }
}
