using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(EcoLifeContext context) : base(context) { }

        public async Task<User?> GetByUser(string user)
            => await context.Set<User>()
                .Include(m => m.Employee)
                    .ThenInclude(x => x.Role)
                .FirstOrDefaultAsync(x => x.Username == user);
    }
}
