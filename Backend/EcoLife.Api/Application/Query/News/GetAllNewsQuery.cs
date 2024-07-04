using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllNewsQuery : IRequest<IEnumerable<New>> { }
}
