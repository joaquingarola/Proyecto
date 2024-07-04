using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllRecolectionQuery : IRequest<IEnumerable<Recolection>> { }
}
