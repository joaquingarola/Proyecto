using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateNewCommand : IRequest<int>
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
