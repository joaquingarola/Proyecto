using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllEmployeeQueryHandler : IRequestHandler<GetAllEmployeeQuery, IEnumerable<Employee>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllEmployeeQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<Employee>> Handle(GetAllEmployeeQuery query, CancellationToken cancellationToken)
        {
            return await _uow.EmployeeRepository.GetAllWithRoleAsync();
        }
    }
}
