using EcoLife.Api.Dtos.Response;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateRecolectionCommand : BaseRecolectionCommand, IRequest<CreateRecolectionResponseDto>
    {
        public int Id { get; set; }
    }
}
