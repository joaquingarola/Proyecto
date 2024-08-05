using EcoLife.Api.Dtos.Response;
using MediatR;

namespace EcoLife.Api.Application
{
    public class ResetPasswordCommand : IRequest
    {
        public string UserName { get; set; }
    }
}
