using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Interfaces
{
    public interface IMaintenanceRepository : IBaseRepository<Maintenance> 
    {
        Task<List<Maintenance>> GetAllWithVehicleAsync();
        Task<Maintenance> GetByIdWithVehicleAsync(int maintenanceId);
    }
}
