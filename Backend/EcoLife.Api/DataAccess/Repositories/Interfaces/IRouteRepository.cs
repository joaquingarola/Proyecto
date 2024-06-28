using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Interfaces
{
    public interface IRouteRepository : IBaseRepository<RouteEntity>
    {
        Task<List<RouteEntity>> GetAllWithContainers();

        Task<RouteEntity> GetByIdWithContainers(int routeId);

        Task<RouteEntity> GetByIdWithRouteContainers(int routeId);

        void Remove(RouteEntity route);
    }
}
