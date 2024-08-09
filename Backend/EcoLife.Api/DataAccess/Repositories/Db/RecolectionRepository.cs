using EcoLife.Api.Data.Constants;
using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

using Microsoft.EntityFrameworkCore;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class RecolectionRepository : BaseRepository<Recolection>, IRecolectionRepository
    {
        public RecolectionRepository(EcoLifeContext context) : base(context) { }

        public async Task<List<Recolection>> GetAllWithEntities()
            => await context.Set<Recolection>()
                .Include(m => m.Employee)
                .Include(m => m.VehicleCenter)
                .Include(m => m.WasteCenter)
                .Include(m => m.Vehicle)
                .Include(m => m.Route)
                .ToListAsync();

        public async Task<Recolection> GetByIdWithEntities(int recolectionId)
            => await context.Set<Recolection>()
                .Include(m => m.VehicleCenter)
                .Include(m => m.WasteCenter)
                .Include(m => m.Route)
                .Include(x => x.RecolectionContainers)
                    .ThenInclude(x => x.Container)
                .FirstAsync(x => x.Id == recolectionId);

        public async Task<Recolection?> GetByRouteId(int routeId)
            => await context.Recolections
                .FirstOrDefaultAsync(x => x.RouteId == routeId);

        public async Task<Recolection?> GetByVehicleCenterId(int vehicleCenterId)
            => await context.Recolections
                .FirstOrDefaultAsync(x => x.VehicleCenterId == vehicleCenterId);

        public async Task<Recolection?> GetByWasteCenterId(int wasteCenterId)
            => await context.Recolections
                .FirstOrDefaultAsync(x => x.WasteCenterId == wasteCenterId);

        public async Task<List<Recolection>> GetByEmployeeId(int employeeId)
            => await context.Recolections
                .Where(x => x.EmployeeId == employeeId)
                .ToListAsync();

        public async Task<List<Recolection>> GetByVehicleId(int vehicleId)
            => await context.Recolections
                .Where(x => x.VehicleId == vehicleId)
                .ToListAsync();

        public async Task<List<Recolection>> GetByEmployeeIdAndTypeWithEntities(int employeeId, List<string> types)
            => await context.Set<Recolection>()
                .Include(m => m.Employee)
                .Include(m => m.VehicleCenter)
                .Include(m => m.WasteCenter)
                .Include(m => m.Vehicle)
                .Include(m => m.Route)
                .Where(x => x.EmployeeId == employeeId && types.Contains(x.Status))
                .ToListAsync();

        public async Task<List<Recolection>> GetByEmployeeIdAndDateWithEntities(int employeeId)
            => await context.Set<Recolection>()
                .Include(m => m.Employee)
                .Include(m => m.VehicleCenter)
                .Include(m => m.WasteCenter)
                .Include(m => m.Vehicle)
                .Include(m => m.Route)
                .Where(x => x.EmployeeId == employeeId && x.EstimatedStartDate.Date == DateTime.Now.Date)
                .ToListAsync();

        public async Task<List<Recolection>> GetFinalizedWithVehicleAndEmployee()
            => await context.Set<Recolection>()
                .Include(m => m.Employee)
                .Include(m => m.Vehicle)
                .Where(x => x.Status == RecolectionStatus.Finalized)
                .ToListAsync();

        public async Task<Recolection?> GetInProgressWithEntities(int employeeId)
            => await context.Set<Recolection>()
                .Include(m => m.Employee)
                .Include(m => m.VehicleCenter)
                .Include(m => m.WasteCenter)
                .Include(m => m.Vehicle)
                .Include(m => m.Route)
                .Include(m => m.RecolectionContainers)
                    .ThenInclude(m => m.Container)
                .FirstOrDefaultAsync(x => x.EmployeeId == employeeId && (x.Status == RecolectionStatus.Initiated || x.Status == RecolectionStatus.PendingVehicle));
    }
}
