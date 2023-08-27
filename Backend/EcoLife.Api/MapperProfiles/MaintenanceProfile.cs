using AutoMapper;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using EcoLife.Api.MapperProfiles.Resolvers;

namespace EcoLife.Api.MapperProfiles
{
    public class MaintenanceProfile : Profile
    {
        public MaintenanceProfile()
        {
            CreateMap<MaintenanceDto, Maintenance>();
            CreateMap<Maintenance, MaintenanceResponseDto>()
                .ForMember(x => x.Status, m => m.MapFrom<MaintenanceStatusResolver>());
        }
    }
}
