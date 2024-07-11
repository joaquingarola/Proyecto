using AutoMapper;

using EcoLife.Api.Application;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class EmployeeProfile : Profile
    {
        public EmployeeProfile()
        {
            CreateMap<CreateEmployeeCommand, Employee>();

            CreateMap<UpdateEmployeeCommand, Employee>();

            CreateMap<Employee, Employee>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()); 
        }
    }
}
