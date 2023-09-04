using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class RoleRepository : BaseRepository<Role>, IRoleRepository 
    {
        public RoleRepository(EcoLifeContext context) : base(context) { }
    }
}
