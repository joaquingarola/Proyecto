using EcoLife.Api.Entities;

using MediatR;

namespace EcoLife.Api.Application
{
    public class GetAllWasteCenterQuery : IRequest<IEnumerable<WasteCenter>> { }
}
