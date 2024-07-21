using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

using Microsoft.EntityFrameworkCore;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class ContainerRepository : BaseRepository<Container>, IContainerRepository
    {
        public ContainerRepository(EcoLifeContext context) : base(context) { }

        public async Task<List<Container>> GetAllWithRouteAsync()
            => await context.Set<Container>()
                .Include(x => x.Route)
                .ToListAsync();

        public async Task<List<Container>> GetByRouteId(int routeId)
            => await context.Containers
                .Where(x => x.RouteId == routeId)
                .ToListAsync();

        public async Task<Container> GetContainerWithRecolectionsAsync(int containerId)
            => await context.Containers
                .Include(x => x.RecolectionContainers)
                    .ThenInclude(s => s.Recolection)
                .FirstAsync(x => x.Id == containerId);
    }
}
