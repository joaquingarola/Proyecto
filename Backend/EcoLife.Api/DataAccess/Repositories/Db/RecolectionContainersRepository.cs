using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

using Microsoft.EntityFrameworkCore;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class RecolectionContainersRepository : BaseRepository<RecolectionContainers>, IRecolectionContainersRepository
    {
        public RecolectionContainersRepository(EcoLifeContext context) : base(context) { }

        public async Task<RecolectionContainers> GetByRecolectionAndContainerIds(int recolectionId, int containerId)
            => await context.RecolectionContainers
                .FirstOrDefaultAsync(x => x.RecolectionId == recolectionId && x.ContainerId == containerId);

        public async Task<List<RecolectionContainers>> GetAllByContainerId(int containerId)
            => await context.RecolectionContainers
                .Include(x => x.Recolection)
                .Where(x => x.ContainerId == containerId)
                .ToListAsync();
    }
}
