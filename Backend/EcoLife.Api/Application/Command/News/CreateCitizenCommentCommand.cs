using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateCitizenCommentCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Comment { get; set; }
    }
}
