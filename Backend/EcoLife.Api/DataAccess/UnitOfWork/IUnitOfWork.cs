using EcoLife.Api.DataAccess.Repositories.Interfaces;

namespace EcoLife.Api.DataAccess.UnitOfWork
{
    public interface IUnitOfWork
    {
        public IZoneRepository ZoneRepository { get; }
        public IVehicleRepository VehicleRepository { get; }
        public IMaintenanceRepository MaintenanceRepository { get; }
        public IEmployeeRepository EmployeeRepository { get; }
        public IRoleRepository RoleRepository { get; }
        public IUserRepository UserRepository { get; }
        public INewRepository NewRepository { get; }
    }
}
