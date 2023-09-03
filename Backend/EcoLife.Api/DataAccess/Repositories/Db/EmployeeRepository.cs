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
    }
}
