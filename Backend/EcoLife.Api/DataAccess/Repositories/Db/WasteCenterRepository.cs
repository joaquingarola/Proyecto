using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class WasteCenterRepository : BaseRepository<WasteCenter>, IWasteCenterRepository
    {
        public WasteCenterRepository(EcoLifeContext context) : base(context) { }
    }
}
