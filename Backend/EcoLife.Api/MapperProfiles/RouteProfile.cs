using AutoMapper;

using EcoLife.Api.Application;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class RouteProfile : Profile
    {
        public RouteProfile()
        {
            CreateMap<UpdateRouteCommand, RouteEntity>()
                .ForMember(dest => dest.Containers, opt => opt.Ignore());
        }
    }
}
