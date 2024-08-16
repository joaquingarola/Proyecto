using MediatR;

namespace EcoLife.Api.Application
{
    public class DeleteCitizenCommentCommand : IRequest
    {
        public int CommentId { get; set; }
    }
}
