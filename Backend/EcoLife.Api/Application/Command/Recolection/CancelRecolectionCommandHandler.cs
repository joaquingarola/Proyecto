using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application.Command.Recolection
{
    public class CancelRecolectionCommandHandler : IRequestHandler<CancelRecolectionCommand>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMediator _mediator;

        public CancelRecolectionCommandHandler(IUnitOfWork uow, IMediator mediator)
        {
            _uow = uow;
            _mediator = mediator;
        }

        public async Task Handle(CancelRecolectionCommand command, CancellationToken cancellationToken)
        {
            var recolection = await _uow.RecolectionRepository.GetByIdAsync(command.RecolectionId);

            recolection.Status = RecolectionStatus.Canceled;

            recolection.RealEndDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time"));

            await _uow.RecolectionRepository.Update(recolection);

            await _mediator.Send(new DamagedVehicleCommand() { VehicleId = recolection.VehicleId }, cancellationToken);
        }
    }
}
