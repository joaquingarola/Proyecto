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
            => await context.Set<RouteEntity>()
                .Select(r => new RouteEntity
                {
                    Id = r.Id,
                    Periodicity = r.Periodicity,
                    Description = r.Description,
                    Quantity = r.Quantity,
                    Containers = r.Containers.Select(c => new Container
                    {
                        Id = c.Id,
                        Latitude = c.Latitude,
                        Longitude = c.Longitude,
                        Capacity = c.Capacity,
                        Address = c.Address,
                        WasteType = c.WasteType,
                        LastEmptying = c.LastEmptying,
                        Status = c.Status,
                        ZoneId = c.ZoneId
                    }).ToList()
                })
            .ToListAsync();

        public async Task<RouteEntity> GetByIdWithContainers(int routeId)
            => await context.Set<RouteEntity>()
                .Where(route => route.Id == routeId)
                .Select(r => new RouteEntity
                {
                    Id = r.Id,
                    Periodicity = r.Periodicity,
                    Description = r.Description,
                    Containers = r.Containers.Select(c => new Container
                    {
                        Id = c.Id,
                        Latitude = c.Latitude,
                        Longitude = c.Longitude,
                        Capacity = c.Capacity,
                        Address = c.Address,
                        WasteType = c.WasteType,
                        LastEmptying = c.LastEmptying,
                        Status = c.Status,
                        ZoneId = c.ZoneId
                    }).ToList()
                }).FirstAsync();

        public void Remove(RouteEntity route)
            => context.Set<RouteEntity>().Remove(route);
    }
}
