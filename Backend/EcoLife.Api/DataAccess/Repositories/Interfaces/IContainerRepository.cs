using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Interfaces
{
    public interface IContainerRepository : IBaseRepository<Container> 
    {
        Task<List<Container>> GetAllWithZoneAsync();
        Task<List<Container>> GetAllWithRouteAsync();
        Task<List<Container>> GetByRoute(int routeId);
    }
}
