using MediatR;

namespace EcoLife.Api.Application.Command.News
{
    public class DeleteNewCommand : IRequest
    {
        public int NewId { get; set; }
    }
}
