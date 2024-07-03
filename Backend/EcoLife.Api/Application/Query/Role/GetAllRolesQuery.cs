using RoleEntity = EcoLife.Api.Entities.Role;

using MediatR;

namespace EcoLife.Api.Application.Query.Role
{
    public class GetAllRolesQuery : IRequest<IEnumerable<RoleEntity>> { }
}
