using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Interfaces
{
    public interface IRecolectionRepository : IBaseRepository<Recolection> 
    {
        Task<List<Recolection>> GetAllWithEntities();
        Task<Recolection> GetByIdWithEntities(int recolectionId);
        Task<Recolection?> GetByRouteId(int routeId);
        Task<Recolection?> GetByVehicleCenterId(int vehicleCenterId);
        Task<Recolection?> GetByWasteCenterId(int wasteCenterId);
        Task<List<Recolection>> GetByEmployeeId(int employeeId);
        Task<List<Recolection>> GetByVehicleId(int vehicleId);
        Task<List<Recolection>> GetByEmployeeIdAndTypeWithEntities(int employeeId, List<string> types);
        Task<List<Recolection>> GetByEmployeeIdAndDateWithEntities(int employeeId);
        Task<Recolection?> GetInProgressWithEntities(int employeeId);
    }
}
