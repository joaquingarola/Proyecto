using AutoMapper;

using EcoLife.Api.Application;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class WasteCenterProfile : Profile
    {
        public WasteCenterProfile()
        {
            CreateMap<CreateWasteCenterCommand, WasteCenter>();

            CreateMap<UpdateWasteCenterCommand, WasteCenter>();
        }
    }
}
