using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateWasteCenterReachedCommandHandler : IRequestHandler<UpdateWasteCenterReachedCommand>
    {
        private readonly IUnitOfWork _uow;

        public UpdateWasteCenterReachedCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(UpdateWasteCenterReachedCommand command, CancellationToken cancellationToken)
        {
            var recolection = await _uow.RecolectionRepository.GetByIdAsync(command.RecolectionId);

            recolection.Status = RecolectionStatus.PendingVehicle;

            recolection.RealEndDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time"));

            await _uow.RecolectionRepository.Update(recolection);
        }
    }
}
