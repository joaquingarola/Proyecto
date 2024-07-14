using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Interfaces
{
    public interface IRouteContainersRepository : IBaseRepository<RouteContainers> 
    {
        Task<RouteContainers?> GetByRouteAndContainerIds(int routeId, int containerId);
    }
}
