using MediatR;

namespace EcoLife.Api.Application.Command.Recolection
{
    public class UpdateRecolectionContainerStatusCommand : IRequest
    {
        public int RecolectionId { get; set; }
        public int ContainerId { get; set; }
    }
}
