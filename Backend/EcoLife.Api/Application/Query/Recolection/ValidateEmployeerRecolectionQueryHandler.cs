using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application
{
    public class ValidateEmployerRecolectionQueryHandler : IRequestHandler<ValidateEmployeeRecolectionQuery, bool>
    {
        private readonly IUnitOfWork _uow;

        public ValidateEmployerRecolectionQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<bool> Handle(ValidateEmployeeRecolectionQuery query, CancellationToken cancellationToken)
        {
            var employeeRecolections = await _uow.RecolectionRepository.GetByEmployeeId(query.EmployeeId);
                
            var inProgress = employeeRecolections.FirstOrDefault(x => x.Status == RecolectionStatus.Initiated || x.Status == RecolectionStatus.VehicleCenterComeBack);

            return inProgress != null;
        }
    }
}
