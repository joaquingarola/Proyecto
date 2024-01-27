using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class VehicleCenterRepository : BaseRepository<VehicleCenter>, IVehicleCenterRepository
    {
        public VehicleCenterRepository(EcoLifeContext context) : base(context) { }
    }
}
