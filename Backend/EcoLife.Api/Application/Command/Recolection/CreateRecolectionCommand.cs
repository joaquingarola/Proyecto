using EcoLife.Api.Dtos.Response;

using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateRecolectionCommand : BaseRecolectionCommand, IRequest<CreateRecolectionResponseDto> { }
}
