namespace EcoLife.Api.DataAccess.Repositories.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        Task<TEntity> AddAndSaveAsync(TEntity entity);

        Task<TEntity> Update(TEntity entity);

        Task<List<TEntity>> GetAllAsync();

        Task<TEntity> GetByIdAsync(int id);

        Task<TEntity> Delete(int id);

        Task SaveChangesAsync();

        void Detach(TEntity entity);
    }
}
