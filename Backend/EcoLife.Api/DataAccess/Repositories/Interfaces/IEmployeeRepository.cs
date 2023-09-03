using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess.Repositories.Interfaces
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        Task<List<Employee>> GetAllWithRoleAsync();
    }
}
