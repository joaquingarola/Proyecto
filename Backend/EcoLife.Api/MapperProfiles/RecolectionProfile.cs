using AutoMapper;

using EcoLife.Api.Application;
using EcoLife.Api.Entities;
using EcoLife.Api.MapperProfiles.Resolvers;

namespace EcoLife.Api.MapperProfiles
{
    public class RecolectionProfile : Profile
    {
        public RecolectionProfile()
        {
            CreateMap<CreateRecolectionCommand, Recolection>()
                .ForMember(x => x.EstimatedStartDate, s => s.MapFrom<RecolectionStartDateResolver>())
                .ForMember(x => x.EstimatedEndDate, s => s.MapFrom<RecolectionEndDateResolver>())
                .ForMember(x => x.Status, s => s.MapFrom(_ => "Planificada"));

            CreateMap<UpdateRecolectionCommand, Recolection>()
                .ForMember(x => x.EstimatedStartDate, s => s.MapFrom<RecolectionStartDateResolver>())
                .ForMember(x => x.EstimatedEndDate, s => s.MapFrom<RecolectionEndDateResolver>());
        }
    }
}
