using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class RecolectionRepository : BaseRepository<Recolection>, IRecolectionRepository
    {
        public RecolectionRepository(EcoLifeContext context) : base(context) { }
    }
}
