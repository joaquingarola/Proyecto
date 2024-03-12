using AutoMapper;

using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class RecolectionProfile : Profile
    {
        public RecolectionProfile()
        {
            CreateMap<RecolectionDto, Recolection>()
                .ForMember(x => x.Status, s => s.MapFrom(_ => "Planificada"));
        }
    }
}
