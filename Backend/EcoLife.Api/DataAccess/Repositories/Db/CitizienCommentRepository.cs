using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class CitizienCommentRepository : BaseRepository<CitizenComment>, ICitizenCommentRepository
    {
        public CitizienCommentRepository(EcoLifeContext context) : base(context) { }
    }
}
