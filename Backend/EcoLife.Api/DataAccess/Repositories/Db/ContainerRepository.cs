using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

using Microsoft.EntityFrameworkCore;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class ContainerRepository : BaseRepository<Container>, IContainerRepository
    {
        public ContainerRepository(EcoLifeContext context) : base(context) { }

        public async Task<List<Container>> GetAllWithZoneAsync()
            => await context.Set<Container>()
                .Include(m => m.Zone)
                .ToListAsync();

        public async Task<List<Container>> GetAllWithRouteAsync()
            => await context.Set<Container>()
                .ToListAsync();

        public async Task<List<Container>> GetByRoute(int routeId)
            => await context.Set<Container>()
                .Where(x => x.RouteId == routeId)
                .ToListAsync();
    }
}
