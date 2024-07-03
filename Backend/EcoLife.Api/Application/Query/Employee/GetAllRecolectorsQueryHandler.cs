using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllRecolectorsQueryHandler : IRequestHandler<GetAllRecolectorsQuery, IEnumerable<Employee>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllRecolectorsQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<Employee>> Handle(GetAllRecolectorsQuery query, CancellationToken cancellationToken)
        {
            return await _uow.EmployeeRepository.GetAllRecolectorsAsync();
        }
    }
}
