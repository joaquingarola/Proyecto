using MediatR;

namespace EcoLife.Api.Application
{
    public class StartRecolectionCommand : IRequest
    {
        public int RecolectionId { get; set; }
    }
}
