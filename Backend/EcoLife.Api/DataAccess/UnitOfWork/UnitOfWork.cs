using EcoLife.Api.DataAccess.Repositories.Db;
using EcoLife.Api.DataAccess.Repositories.Interfaces;

namespace EcoLife.Api.DataAccess.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public IZoneRepository ZoneRepository { get; private set; }
        public IVehicleRepository VehicleRepository { get; private set; }
        public IMaintenanceRepository MaintenanceRepository { get; private set; }

        public UnitOfWork(EcoLifeContext context)
        {
            ZoneRepository = new ZoneRepository(context);
            VehicleRepository = new VehicleRepository(context);
            MaintenanceRepository = new MaintenanceRepository(context);
        }
    }
}
