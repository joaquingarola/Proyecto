using AutoMapper;

using EcoLife.Api.Application;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class RouteProfile : Profile
    {
        public RouteProfile()
        {
            CreateMap<UpdateRouteCommand, RouteEntity>();
        }
    }
}
