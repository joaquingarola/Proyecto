using AutoMapper;

using EcoLife.Api.Application;
using EcoLife.Api.Data.Constants;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class VehicleProfile : Profile
    {
        public VehicleProfile()
        {
            CreateMap<CreateVehicleCommand, Vehicle>()
                .ForMember(x => x.Status, c => c.MapFrom(_ => VehicleStatus.Available));

            CreateMap<UpdateVehicleCommand, Vehicle>();
        }
    }
}
