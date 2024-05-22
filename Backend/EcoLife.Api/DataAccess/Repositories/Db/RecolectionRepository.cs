using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

using Microsoft.EntityFrameworkCore;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class RecolectionRepository : BaseRepository<Recolection>, IRecolectionRepository
    {
        public RecolectionRepository(EcoLifeContext context) : base(context) { }

        public async Task<List<Recolection>> GetAllWithEntities()
            => await context.Set<Recolection>()
                .Include(m => m.Employee)
                .Include(m => m.VehicleCenter)
                .Include(m => m.WasteCenter)
                .Include(m => m.Vehicle)
                .ToListAsync();
    }
}
