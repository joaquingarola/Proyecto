using AutoMapper;

using EcoLife.Api.Application;

namespace EcoLife.Api.MapperProfiles.Resolvers
{
    public class RecolectionStartDateResolver : IValueResolver<BaseRecolectionCommand, object, DateTime>
    {
        public DateTime Resolve(BaseRecolectionCommand source, object destination, DateTime destMember, ResolutionContext context)
        {
            var startDate = source.StartDate.Date;

            var time = source.estimatedStartTime.Split(":");

            TimeSpan ts = new (int.Parse(time[0]), int.Parse(time[1]), 0);

            startDate += ts;

            return startDate;
        }
    }
}
