using AutoMapper;
using EcoLife.Api.Application;

namespace EcoLife.Api.MapperProfiles.Resolvers
{
    public class RecolectionEndDateResolver : IValueResolver<BaseRecolectionCommand, object, DateTime>
    {
        public DateTime Resolve(BaseRecolectionCommand source, object destination, DateTime destMember, ResolutionContext context)
        {
            var endDate = source.StartDate.Date;

            var startTime = source.estimatedStartTime.Split(":");

            var endTime = source.estimatedEndTime.Split(":");

            TimeSpan start = new(int.Parse(startTime[0]), int.Parse(startTime[1]), 0);

            TimeSpan end = new (int.Parse(endTime[0]), int.Parse(endTime[1]), 0);

            endDate += end;

            if(start >= end)
            {
                endDate = endDate.AddDays(1);
            }

            return endDate;
        }
    }
}
