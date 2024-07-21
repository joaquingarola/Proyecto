using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateRecolectionDamagedContainerCommand : IRequest
    {
        public int ContainerId { get; set; }
    }
}
