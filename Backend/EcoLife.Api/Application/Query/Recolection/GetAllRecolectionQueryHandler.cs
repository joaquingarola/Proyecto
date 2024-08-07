﻿using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllRecolectionQueryHandler : IRequestHandler<GetAllRecolectionQuery, IEnumerable<Recolection>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllRecolectionQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<Recolection>> Handle(GetAllRecolectionQuery query, CancellationToken cancellationToken)
        {
            var recolections = await _uow.RecolectionRepository.GetAllWithEntities();
            return recolections.OrderBy(x => x.RealStartDate ?? x.EstimatedStartDate).ToList();
        }
    }
}
