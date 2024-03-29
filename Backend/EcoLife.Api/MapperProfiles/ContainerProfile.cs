﻿using AutoMapper;

using EcoLife.Api.Dtos;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class ContainerProfile : Profile
    {
        public ContainerProfile()
        {
            CreateMap<ContainerDto, Container>()
                .ForMember(x => x.LastEmptying, c => c.MapFrom(_ => DateTime.Now));
        }
    }
}
