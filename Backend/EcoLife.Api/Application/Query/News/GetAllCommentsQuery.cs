using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllCommentsQuery : IRequest<IEnumerable<CitizenComment>> { }
}
