using MediatR;

namespace EcoLife.Api.Application.Command.News
{
    public class EditNewCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }
}
