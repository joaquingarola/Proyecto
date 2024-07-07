using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateRecolectionCommand : BaseRecolectionCommand, IRequest<int>
    {
        public int Id { get; set; }
    }
}
