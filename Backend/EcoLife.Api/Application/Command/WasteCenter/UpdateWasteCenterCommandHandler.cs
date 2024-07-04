using AutoMapper;
using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateWasteCenterCommandHandler : IRequestHandler<UpdateWasteCenterCommand, int>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public UpdateWasteCenterCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<int> Handle(UpdateWasteCenterCommand command, CancellationToken cancellationToken)
        {
            var wasteCenter = _mapper.Map<WasteCenter>(command);

            var result = await _uow.WasteCenterRepository.Update(wasteCenter);

            return result.Id;
        }
    }
}
