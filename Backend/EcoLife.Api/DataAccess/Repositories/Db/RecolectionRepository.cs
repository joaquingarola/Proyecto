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
                .Include(m => m.Route)
                    .ThenInclude(x => x.RouteContainers)
                        .ThenInclude(x => x.Container)
                .ToListAsync();

        public async Task<Recolection> GetByIdWithEntities(int recolectionId)
            => await context.Set<Recolection>()
                .Include(m => m.VehicleCenter)
                .Include(m => m.WasteCenter)
                .Include(m => m.Route)
                    .ThenInclude(x => x.RouteContainers)
                        .ThenInclude(x => x.Container)
                .FirstAsync(x => x.Id == recolectionId);

        public async Task<Recolection?> GetByRouteId(int routeId)
            => await context.Recolections
                .FirstOrDefaultAsync(x => x.RouteId == routeId);
    }
}
