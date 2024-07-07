using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateRecolectionCommand : BaseRecolectionCommand, IRequest<int> { }
}
