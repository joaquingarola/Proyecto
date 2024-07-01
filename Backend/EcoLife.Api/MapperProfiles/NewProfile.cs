﻿using AutoMapper;

using EcoLife.Api.Application.Command.News;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles
{
    public class NewProfile : Profile
    {
        public NewProfile() 
        {
            CreateMap<CreateNewCommand, New>()
                .ForMember(x => x.Date, m => m.MapFrom(x => DateTime.Now));

            CreateMap<EditNewCommand, New>();
        }
    }
}
