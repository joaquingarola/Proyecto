using AutoMapper;

using EcoLife.Api.Dtos.Response;
using EcoLife.Api.Entities;
using EcoLife.Api.MapperProfiles.Resolvers;

namespace EcoLife.Api.MapperProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<Employee, User>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.Username, s => s.MapFrom(o => o.Email))
                .ForMember(x => x.Password, m => m.MapFrom<RandomPasswordResolver>())
                .ForMember(x => x.IsFirstEntry, m => m.MapFrom(o => true))
                .ForMember(x => x.Employee, m => m.MapFrom(o => o));

            CreateMap<User, UserResponseDto>();

            CreateMap<User, User>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.EmployeeId, opt => opt.Ignore()); 
        }
    }
}
