using EcoLife.Api.DataAccess.Repositories.Db;
using EcoLife.Api.DataAccess.Repositories.Interfaces;

namespace EcoLife.Api.DataAccess.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public IVehicleRepository VehicleRepository { get; private set; }
        public IMaintenanceRepository MaintenanceRepository { get; private set; }
        public IEmployeeRepository EmployeeRepository { get; private set; }
        public IRoleRepository RoleRepository { get; private set; }
        public IUserRepository UserRepository { get; private set; }
        public INewRepository NewRepository { get; private set; }
        public IContainerRepository ContainerRepository { get; private set; }
        public IWasteCenterRepository WasteCenterRepository { get; private set; }
        public IVehicleCenterRepository VehicleCenterRepository { get; private set; }
        public IRouteRepository RouteRepository { get; private set; }
        public IRecolectionRepository RecolectionRepository { get; private set; }
        public IRouteContainersRepository RouteContainersRepository { get; private set; }

        public UnitOfWork(EcoLifeContext context)
        {
            VehicleRepository = new VehicleRepository(context);
            MaintenanceRepository = new MaintenanceRepository(context);
            EmployeeRepository = new EmployeeRepository(context);
            RoleRepository = new RoleRepository(context);
            UserRepository = new UserRepository(context);
            NewRepository = new NewRepository(context);
            ContainerRepository = new ContainerRepository(context);
            WasteCenterRepository = new WasteCenterRepository(context);
            VehicleCenterRepository = new VehicleCenterRepository(context);
            RouteRepository = new RouteRepository(context);
            RecolectionRepository = new RecolectionRepository(context);
            RouteContainersRepository = new RouteContainersRepository(context);
        }
    }
}
