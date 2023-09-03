using AutoMapper;

using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class EmployeeProfile : Profile
    {
        public EmployeeProfile()
        {
            CreateMap<EmployeeDto, Employee>();
        }
    }
}
