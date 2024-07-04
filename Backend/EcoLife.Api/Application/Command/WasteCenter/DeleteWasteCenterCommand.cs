using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteWasteCenterCommand : IRequest
    {
        public int WasteCenterId { get; set; }
    }
}
