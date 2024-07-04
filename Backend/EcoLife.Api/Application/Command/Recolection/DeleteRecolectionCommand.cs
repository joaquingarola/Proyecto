using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteRecolectionCommand : IRequest
    {
        public int RecolectionId { get; set; }
    }
}
