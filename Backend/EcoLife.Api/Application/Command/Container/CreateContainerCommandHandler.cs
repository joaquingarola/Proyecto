using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateContainerCommandHandler : IRequestHandler<CreateContainerCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CreateContainerCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(CreateContainerCommand command, CancellationToken cancellationToken)
        {
            var container = _mapper.Map<Container>(command);

            var result = await _uow.ContainerRepository.AddAndSaveAsync(container);

            return result.Id;
        }
    }
}
