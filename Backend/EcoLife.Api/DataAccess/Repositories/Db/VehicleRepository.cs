using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

using Microsoft.EntityFrameworkCore;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class VehicleRepository : BaseRepository<Vehicle>, IVehicleRepository
    { 
        public VehicleRepository(EcoLifeContext context) : base(context) { }

        public async Task<List<Vehicle>> GetAllWithCenter()
            => await context.Set<Vehicle>()
                .Include(m => m.VehicleCenter)
                .ToListAsync();
    }
}
