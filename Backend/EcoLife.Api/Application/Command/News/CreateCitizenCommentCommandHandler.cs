using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateCitizenCommentCommandHandler : IRequestHandler<CreateCitizenCommentCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CreateCitizenCommentCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(CreateCitizenCommentCommand command, CancellationToken cancellationToken)
        {
            var newComment = _mapper.Map<CitizenComment>(command);

            var result = await _uow.CitizenCommentRepository.AddAndSaveAsync(newComment);

            return result.Id;
        }
    }
}
