using AutoMapper;

using EcoLife.Api.Application;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class RecolectionProfile : Profile
    {
        public RecolectionProfile()
        {
            CreateMap<CreateRecolectionCommand, Recolection>()
                .ForMember(x => x.Status, s => s.MapFrom(_ => "Planificada"));

            CreateMap<UpdateRecolectionCommand, Recolection>();
        }
    }
}
