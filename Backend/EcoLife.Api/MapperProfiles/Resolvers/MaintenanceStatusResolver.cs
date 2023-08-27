using AutoMapper;
using EcoLife.Api.Data.Constants;
using EcoLife.Api.Entities;

namespace EcoLife.Api.MapperProfiles.Resolvers
{
    public class MaintenanceStatusResolver : IValueResolver<Maintenance, object, string>
    {
        public string Resolve(Maintenance source, object destination, string destMember, ResolutionContext context)
        {
            var actualDate = DateTime.Now.Date;

            if (source.EndDate.HasValue)
            {
                return MaintenanceStatus.Completed;
            }

            return actualDate < source.StartDate.Date ? MaintenanceStatus.Planned : MaintenanceStatus.InProgress;
        }
    }
}
