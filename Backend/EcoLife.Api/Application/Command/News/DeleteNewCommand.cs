using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteNewCommand : IRequest
    {
        public int NewId { get; set; }
    }
}
