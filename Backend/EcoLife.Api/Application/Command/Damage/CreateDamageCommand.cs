using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateDamageCommand : IRequest
    {
        public string Type { get; set; }
    }
}
