using AutoMapper;

using EcoLife.Api.Application;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class ContainerProfile : Profile
    {
        public ContainerProfile()
        {
            CreateMap<CreateContainerCommand, Container>()
                .ForMember(x => x.LastEmptying, c => c.MapFrom(_ => DateTime.Now));

            CreateMap<UpdateContainerCommand, Container>();
        }
    }
}
