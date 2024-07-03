using EcoLife.Api.DataAccess.UnitOfWork;
using RoleEntity = EcoLife.Api.Entities.Role;

using MediatR;

namespace EcoLife.Api.Application.Query.Role
{
    public class GetAllRolesQueryHandler : IRequestHandler<GetAllRolesQuery, IEnumerable<RoleEntity>>
    {
        private readonly IUnitOfWork _uow;

        public GetAllRolesQueryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<IEnumerable<RoleEntity>> Handle(GetAllRolesQuery query, CancellationToken cancellationToken)
        { 
            return await _uow.RoleRepository.GetAllAsync();
        }
    }
}
