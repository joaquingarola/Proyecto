﻿using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllContainersQueryHandler : IRequestHandler<GetAllContainersQuery, IEnumerable<Container>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllContainersQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<Container>> Handle(GetAllContainersQuery query, CancellationToken cancellationToken)
        {
            return await _uow.ContainerRepository.GetAllWithRouteAsync();
        }
    }
}
