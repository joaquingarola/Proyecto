using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateNewCommandHandler : IRequestHandler<UpdateNewCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public UpdateNewCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(UpdateNewCommand command, CancellationToken cancellationToken)
        {
            var editNew = _mapper.Map<New>(command);
            
            var result = await _uow.NewRepository.Update(editNew);

            return result.Id;
        }
    }
}
