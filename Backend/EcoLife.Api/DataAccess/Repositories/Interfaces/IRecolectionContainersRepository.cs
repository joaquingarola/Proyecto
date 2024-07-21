using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Interfaces
{
    public interface IRecolectionContainersRepository : IBaseRepository<RecolectionContainers>
    {
        Task<RecolectionContainers> GetByRecolectionAndContainerIds(int recolectionId, int containerId);
        Task<List<RecolectionContainers>> GetAllByContainerId(int containerId);
    }
}
