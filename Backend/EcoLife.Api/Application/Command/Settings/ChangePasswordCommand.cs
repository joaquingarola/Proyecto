using EcoLife.Api.Dtos.Response;

using MediatR;

namespace EcoLife.Api.Application
{
    public class ChangePasswordCommand : IRequest<ChangePasswordResponseDto>
    {
        public string User { get; set; }
        public string NewPassword { get; set; }
    }
}
