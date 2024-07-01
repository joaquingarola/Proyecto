using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application.Command.News
{
    public class GetAllNewsQuery : IRequest<IEnumerable<New>> { }
}
