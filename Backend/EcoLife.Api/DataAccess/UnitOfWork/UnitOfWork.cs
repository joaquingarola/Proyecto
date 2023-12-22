using EcoLife.Api.DataAccess.Repositories.Db;
using EcoLife.Api.DataAccess.Repositories.Interfaces;

namespace EcoLife.Api.DataAccess.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public IZoneRepository ZoneRepository { get; private set; }
        public IVehicleRepository VehicleRepository { get; private set; }
        public IMaintenanceRepository MaintenanceRepository { get; private set; }
        public IEmployeeRepository EmployeeRepository { get; private set; }
        public IRoleRepository RoleRepository { get; private set; }
        public IUserRepository UserRepository { get; private set; }
        public INewRepository NewRepository { get; private set; }

        public UnitOfWork(EcoLifeContext context)
        {
            ZoneRepository = new ZoneRepository(context);
            VehicleRepository = new VehicleRepository(context);
            MaintenanceRepository = new MaintenanceRepository(context);
            EmployeeRepository = new EmployeeRepository(context);
            RoleRepository = new RoleRepository(context);
            UserRepository = new UserRepository(context);
            NewRepository = new NewRepository(context);
        }
    }
}
