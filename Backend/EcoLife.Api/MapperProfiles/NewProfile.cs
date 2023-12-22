using AutoMapper;

using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;
using EcoLife.Api.MapperProfiles.Resolvers;

namespace EcoLife.Api.MapperProfiles
{
    public class NewProfile : Profile
    {
        public NewProfile() 
        {
            CreateMap<NewDto, New>()
                .ForMember(x => x.Date, m => m.MapFrom(x => DateTime.Now));
        }
    }
}
