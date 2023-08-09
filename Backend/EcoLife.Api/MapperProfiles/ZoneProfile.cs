using AutoMapper;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class ZoneProfile : Profile
    {
        public ZoneProfile()
        {
            CreateMap<ZoneDto, Zone>();
        }
    }
}
