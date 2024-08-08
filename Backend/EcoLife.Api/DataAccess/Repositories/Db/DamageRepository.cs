using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class DamageRepository : BaseRepository<Damage>, IDamageRepository
    {
        public DamageRepository(EcoLifeContext context) : base(context) { }
    }
}
