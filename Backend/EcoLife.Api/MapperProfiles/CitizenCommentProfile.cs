using AutoMapper;
using EcoLife.Api.Application;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class CitizenCommentProfile : Profile
    {
        public CitizenCommentProfile()
        {
            CreateMap<CreateCitizenCommentCommand, CitizenComment>()
                .ForMember(x => x.Date, m => m.MapFrom(x => DateTime.Now));
        }
    }
}
