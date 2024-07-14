using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

using Microsoft.EntityFrameworkCore;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class RouteContainersRepository : BaseRepository<RouteContainers>, IRouteContainersRepository
    {
        public RouteContainersRepository(EcoLifeContext context) : base(context) { }

        public async Task<RouteContainers?> GetByRouteAndContainerIds(int routeId, int containerId)
            => await context.RouteContainers
                .FirstOrDefaultAsync(x => x.RouteId == routeId && x.ContainerId == containerId);
    }
}
