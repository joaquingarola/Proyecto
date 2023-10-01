using EcoLife.Api.DataAccess.Repositories.Base;
using EcoLife.Api.DataAccess.Repositories.Interfaces;
using EcoLife.Api.Entities;

using Microsoft.EntityFrameworkCore;

namespace EcoLife.Api.DataAccess.Repositories.Db
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(EcoLifeContext context) : base(context) { }

        public async Task<List<Employee>> GetAllWithRoleAsync()
            => await context.Set<Employee>()
                .Include(m => m.Role)
                .ToListAsync();

        public async Task<Employee?> GetByEmailAsync(string email)
            => await context.Set<Employee>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Email == email);

        public async Task<Employee?> GetByDniAsync(string dni)
            => await context.Set<Employee>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Dni == dni);

        public async Task<Employee?> GetByIdWithUser(int id)
            => await context.Set<Employee>()
                .AsNoTracking()
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);
    }
}
