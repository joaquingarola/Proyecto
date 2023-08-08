using EcoLife.Api.DataAccess.Repositories.Interfaces;

namespace EcoLife.Api.DataAccess.UnitOfWork
{
    public interface IUnitOfWork
    {
        public IZoneRepository ZoneRepository { get; }
    }
}
