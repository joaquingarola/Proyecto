using EcoLife.Api.Entities;
using MediatR;

namespace EcoLife.Api.Application
{
    public class GetRecolectionByIdQuery : IRequest<Recolection>
    {
        public int RecolectionId { get; set; }
    }
}
