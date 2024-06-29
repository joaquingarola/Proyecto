using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Interfaces
{
    public interface IRecolectionRepository : IBaseRepository<Recolection> 
    {
        Task<List<Recolection>> GetAllWithEntities();
        Task<Recolection> GetByIdWithEntities(int recolectionId);
    }
}
