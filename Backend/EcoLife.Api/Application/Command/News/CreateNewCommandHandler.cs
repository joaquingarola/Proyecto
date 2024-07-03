using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application.Command.News
{
    public class CreateNewCommandHandler : IRequestHandler<CreateNewCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CreateNewCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(CreateNewCommand command, CancellationToken cancellationToken)
        {
            var createNew = _mapper.Map<New>(command);

            var result = await _uow.NewRepository.AddAndSaveAsync(createNew);

            return result.Id;
        }
    }
}
