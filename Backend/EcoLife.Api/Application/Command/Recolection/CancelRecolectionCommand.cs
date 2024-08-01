using MediatR;

namespace EcoLife.Api.Application
{
    public class CancelRecolectionCommand : IRequest
    {
        public int RecolectionId { get; set; }
    }
}
