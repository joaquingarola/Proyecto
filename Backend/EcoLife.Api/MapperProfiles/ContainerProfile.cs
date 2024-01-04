using AutoMapper;

using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class ContainerProfile : Profile
    {
        public ContainerProfile()
        {
            CreateMap<ContainerDto, Container>();
        }
    }
}
