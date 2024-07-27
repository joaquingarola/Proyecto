using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateWasteCenterReachedCommand : IRequest
    {
        public int RecolectionId { get; set; }
    }
}
