using Microsoft.EntityFrameworkCore;

using EcoLife.Api.Entities;

namespace EcoLife.Api.DataAccess
{
    public class EcoLifeContext : DbContext
    {
        public EcoLifeContext(DbContextOptions options) : base(options) { }

        public virtual DbSet<Zone> Zones { get; set; }
    }
}
