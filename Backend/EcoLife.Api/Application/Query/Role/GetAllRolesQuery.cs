using RoleEntity = EcoLife.Api.Entities.Role;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllRolesQuery : IRequest<IEnumerable<RoleEntity>> { }
}
