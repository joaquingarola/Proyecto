using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllWasteCenterQueryHandler : IRequestHandler<GetAllWasteCenterQuery, IEnumerable<WasteCenter>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllWasteCenterQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<WasteCenter>> Handle(GetAllWasteCenterQuery query, CancellationToken cancellationToken)
        {
            return await _uow.WasteCenterRepository.GetAllAsync();
        }
    }
}
