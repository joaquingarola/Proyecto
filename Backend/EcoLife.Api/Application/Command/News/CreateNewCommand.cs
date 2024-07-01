using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application.Command.News
{
    public class CreateNewCommand : IRequest<int>
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
