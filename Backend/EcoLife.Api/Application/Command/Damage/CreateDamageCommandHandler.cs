using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateDamageCommandHandler : IRequestHandler<CreateDamageCommand>
    {
        private readonly IUnitOfWork _uow;

        public CreateDamageCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Handle(CreateDamageCommand command, CancellationToken cancellationToken)
        {
            var newDamage = new Damage(command.Type);

            await _uow.DamageRepository.AddAndSaveAsync(newDamage);
        }
    }
}
