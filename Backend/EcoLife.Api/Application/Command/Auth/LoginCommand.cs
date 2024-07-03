using EcoLife.Api.Dtos.Response;

using MediatR;

namespace EcoLife.Api.Application.Command.Auth
{
    public class LoginCommand : IRequest<UserResponseDto>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
