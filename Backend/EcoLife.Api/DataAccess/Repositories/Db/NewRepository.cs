using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class NewRepository : BaseRepository<New>, INewRepository
    {
        public NewRepository(EcoLifeContext context) : base(context) { }
    }
}
