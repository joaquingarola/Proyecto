using Microsoft.EntityFrameworkCore;

using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess
{
    public class EcoLifeContext : DbContext
    {
        public EcoLifeContext(DbContextOptions options) : base(options) { }

        public virtual DbSet<Zone> Zones { get; set; }
        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public virtual DbSet<Maintenance> Maintenances { get; set;}
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<New> News { get; set; }
        public virtual DbSet<Container> Containers { get; set; }
    }
}
