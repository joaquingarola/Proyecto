using EcoLife.Api.DataAccess.UnitOfWork;
using MediatR;

namespace EcoLife.Api.Application
{
    public class StartRecolectionCommandHandler : IRequestHandler<StartRecolectionCommand>
    {
        private readonly IUnitOfWork _uow;

        public StartRecolectionCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(StartRecolectionCommand command, CancellationToken cancellationToken)
        {
            var recolection = await _uow.RecolectionRepository.GetByIdAsync(command.RecolectionId);

            recolection.Status = "Iniciada";

            recolection.RealStartDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time"));

            await _uow.RecolectionRepository.Update(recolection);
        }
    }
}
