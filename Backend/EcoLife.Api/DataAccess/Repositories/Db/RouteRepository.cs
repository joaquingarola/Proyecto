using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

using Microsoft.EntityFrameworkCore;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class RouteRepository : BaseRepository<RouteEntity>, IRouteRepository
    {
        public RouteRepository(EcoLifeContext context) : base(context) { }

        public async Task<List<RouteEntity>> GetAllWithContainers()
            => await context.Routes
                .Include(x => x.RouteContainers)
                    .ThenInclude(x => x.Container)
                .ToListAsync();

        public async Task<RouteEntity> GetByIdWithContainers(int routeId)
            => await context.Routes
                .Include(x => x.RouteContainers)
                    .ThenInclude(x => x.Container)
                .FirstOrDefaultAsync(x => x.Id == routeId);

        public async Task<RouteEntity> GetByIdWithRouteContainers(int routeId)
            => await context.Routes
                .Include(x => x.RouteContainers)
                .FirstOrDefaultAsync(x => x.Id == routeId);

        public void Remove(RouteEntity route)
            => context.Routes.Remove(route);
    }
}
