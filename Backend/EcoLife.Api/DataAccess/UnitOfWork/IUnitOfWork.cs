using EcoLife.Api.DataAccess.Repositories.Interfaces;

namespace EcoLife.Api.DataAccess.UnitOfWork
{
    public interface IUnitOfWork
    {
        public IVehicleRepository VehicleRepository { get; }
        public IMaintenanceRepository MaintenanceRepository { get; }
        public IEmployeeRepository EmployeeRepository { get; }
        public IRoleRepository RoleRepository { get; }
        public IUserRepository UserRepository { get; }
        public INewRepository NewRepository { get; }
        public IContainerRepository ContainerRepository { get; }
        public IWasteCenterRepository WasteCenterRepository { get; }
        public IVehicleCenterRepository VehicleCenterRepository { get; }
        public IRouteRepository RouteRepository { get; }
        public IRecolectionRepository RecolectionRepository { get; }
        public IRouteContainersRepository RouteContainersRepository { get; }
    }
}
