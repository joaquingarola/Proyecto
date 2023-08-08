using EcoLife.Api.DataAccess.Repositories.Db;
using EcoLife.Api.DataAccess.Repositories.Interfaces;

namespace EcoLife.Api.DataAccess.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly EcoLifeContext _context;
        public IZoneRepository ZoneRepository { get; private set; }

        public UnitOfWork(EcoLifeContext context)
        {
            this._context = context;
            ZoneRepository = new ZoneRepository(context);
        }
    }
}
