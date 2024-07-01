using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application.Command.News
{
    public class EditNewCommandHandler : IRequestHandler<EditNewCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public EditNewCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(EditNewCommand command, CancellationToken cancellationToken)
        {
            var editNew = _mapper.Map<New>(command);
            
            var result = await _uow.NewRepository.Update(editNew);

            return result.Id;
        }
    }
}
