using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using EcoLife.Api.Services.Interfaces;

using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateRecolectionCommandHandler : IRequestHandler<CreateRecolectionCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptimizationService _optimizationService;

        public CreateRecolectionCommandHandler(IUnitOfWork uow, IMapper mapper, IOptimizationService optimizationService)
        {
            _uow = uow;
            _mapper = mapper;
            _optimizationService = optimizationService;
        }

        public async Task<int> Handle(CreateRecolectionCommand command, CancellationToken cancellationToken)
        {
            var recolection = _mapper.Map<Recolection>(command);

            var result = await _uow.RecolectionRepository.AddAndSaveAsync(recolection);

            await _optimizationService.OrderContainersRoute(result.Id);

            return result.Id;
        }
    }
}
