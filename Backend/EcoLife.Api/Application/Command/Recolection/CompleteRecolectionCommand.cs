using MediatR;

namespace EcoLife.Api.Application
{
    public class CompleteRecolectionCommand : IRequest
    {
        public int RecolectionId { get; set; }
    }
}
