using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetEmployeeByIdQueryHandler : IRequestHandler<GetEmployeeByIdQuery, Employee>
    {
        private readonly IUnitOfWork _uow;

        public GetEmployeeByIdQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<Employee> Handle(GetEmployeeByIdQuery query, CancellationToken cancellationToken)
        {
            return await _uow.EmployeeRepository.GetByIdAsync(query.EmployeeId);
        }
    }
}
