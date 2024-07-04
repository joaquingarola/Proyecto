using AutoMapper;

using EcoLife.Api.Application;
using EcoLife.Api.Dtos.Response;
using EcoLife.Api.Entities;
using EcoLife.Api.MapperProfiles.Resolvers;

namespace EcoLife.Api.MapperProfiles
{
    public class MaintenanceProfile : Profile
    {
        public MaintenanceProfile()
        {
            CreateMap<CreateMaintenanceCommand, Maintenance>();
            CreateMap<Maintenance, MaintenanceResponseDto>()
                .ForMember(x => x.Status, m => m.MapFrom<MaintenanceStatusResolver>());
        }
    }
}
