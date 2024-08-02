using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application
{
    public class CompleteRecolectionCommandHandler : IRequestHandler<CompleteRecolectionCommand>
    {
        private readonly IUnitOfWork _uow;

        public CompleteRecolectionCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(CompleteRecolectionCommand command, CancellationToken cancellationToken)
        {
            var recolection = await _uow.RecolectionRepository.GetByIdAsync(command.RecolectionId);

            recolection.Status = RecolectionStatus.Finalized;

            recolection.RealEndDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time"));

            await _uow.RecolectionRepository.Update(recolection);
        }
    }
}
