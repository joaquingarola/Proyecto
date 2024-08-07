﻿using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetInProgressByEmployeeIdQueryHandler : IRequestHandler<GetInProgressByEmployeeIdQuery, Recolection?>
    {
        private readonly IUnitOfWork _uow;

        public GetInProgressByEmployeeIdQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<Recolection?> Handle(GetInProgressByEmployeeIdQuery query, CancellationToken cancellationToken)
        {
            var employeeRecolection = await _uow.RecolectionRepository.GetInProgressWithEntities(query.EmployeeId);

            return employeeRecolection;
        }
    }
}
