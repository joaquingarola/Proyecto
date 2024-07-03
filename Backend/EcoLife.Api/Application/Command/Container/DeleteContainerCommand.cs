using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteContainerCommand : IRequest
    {
        public int ContainerId { get; set; }
    }
}
