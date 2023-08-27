using AutoMapper;
using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class MaintenanceProfile : Profile
    {
        public MaintenanceProfile()
        {
            CreateMap<MaintenanceDto, Maintenance>();
        }
    }
}
