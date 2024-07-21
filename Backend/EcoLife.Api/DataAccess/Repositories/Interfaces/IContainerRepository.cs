using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Interfaces
{
    public interface IContainerRepository : IBaseRepository<Container> 
    {
        Task<List<Container>> GetAllWithRouteAsync();

        Task<List<Container>> GetByRouteId(int routeId);

        Task<Container> GetContainerWithRecolectionsAsync(int containerId);
    }
}
