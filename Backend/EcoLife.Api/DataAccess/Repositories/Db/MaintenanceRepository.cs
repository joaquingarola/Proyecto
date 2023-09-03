using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

using Microsoft.EntityFrameworkCore;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class MaintenanceRepository : BaseRepository<Maintenance>, IMaintenanceRepository
    {
        public MaintenanceRepository(EcoLifeContext context) : base(context) { }

        public async Task<List<Maintenance>> GetAllWithVehicleAsync()
            => await context.Set<Maintenance>()
                .Include(m => m.Vehicle)
                .ToListAsync();
    }
}
