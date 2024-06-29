using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace EcoLife.Api.DataAccess.Repositories.Base
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected readonly EcoLifeContext context;

        public BaseRepository(EcoLifeContext context) 
            => this.context = context;

        public async Task<TEntity> AddAndSaveAsync(TEntity entity)
        {
            var entry = await context.AddAsync(entity);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<List<TEntity>> GetAllAsync()
            => await context.Set<TEntity>().ToListAsync();

        public async Task<TEntity> GetByIdAsync(int id)
            => await context.Set<TEntity>().FindAsync(id);

        public async Task<TEntity> Update(TEntity entity)
        {
            var entry = context.Update(entity);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<TEntity> Delete(int id)
        {
            var entity = await context.Set<TEntity>().FindAsync(id);
            var entry = context.Set<TEntity>().Remove(entity);
            await context.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task SaveChangesAsync()
            => await context.SaveChangesAsync();

        public void Detach(TEntity entity)
        {
            context.Entry(entity).State = EntityState.Detached;
        }
    }
}
