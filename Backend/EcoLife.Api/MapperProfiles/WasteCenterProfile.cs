using AutoMapper;

using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class WasteCenterProfile : Profile
    {
        public WasteCenterProfile()
        {
            CreateMap<WasteCenterDto, WasteCenter>();
        }
    }
}
