using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateRecolectionContainerLocationChangeCommand : IRequest
    {
        public int ContainerId { get; set; }
    }
}
