using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos.Response;
using EcoLife.Api.Entities;
using EcoLife.Api.Services.Interfaces;

using MediatR;

namespace EcoLife.Api.Application
{
    public class CreateRecolectionCommandHandler : IRequestHandler<CreateRecolectionCommand, CreateRecolectionResponseDto>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptimizationService _optimizationService;

        public CreateRecolectionCommandHandler(IUnitOfWork uow, IMapper mapper, IOptimizationService optimizationService)
        {
            _uow = uow;
            _mapper = mapper;
            _optimizationService = optimizationService;
        }

        public async Task<CreateRecolectionResponseDto> Handle(CreateRecolectionCommand command, CancellationToken cancellationToken)
        {
            var recolection = _mapper.Map<Recolection>(command);

            if (await ValidateEmployee(recolection))
                return new CreateRecolectionResponseDto() { Success = false, Message = "El recolector tiene otra recolección en ese horario." };

            if (await ValidateVehicle(recolection))
                return new CreateRecolectionResponseDto() { Success = false, Message = "El vehículo esta asignado a otra recolección en ese horario." };

            var route = await _uow.RouteRepository.GetByIdWithContainers(command.RouteId);

            recolection.RecolectionContainers = new List<RecolectionContainers>();

            foreach(var container in route.Containers)
            {
                recolection.RecolectionContainers.Add(new RecolectionContainers(container));
            }

            var result = await _uow.RecolectionRepository.AddAndSaveAsync(recolection);

            await _optimizationService.OrderContainersRoute(result.Id);

            return new CreateRecolectionResponseDto() { Success = true, Id = result.Id }; 
        }

        public async Task<bool> ValidateEmployee(Recolection newRecolection)
        {
            var oldRecolections = await _uow.RecolectionRepository.GetByEmployeeId(newRecolection.EmployeeId);

            var busyEmployee =
                oldRecolections.Any(x =>
                    (((x.RealStartDate ?? x.EstimatedStartDate) <= newRecolection.EstimatedStartDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) >= newRecolection.EstimatedStartDate)) ||
                    (((x.RealStartDate ?? x.EstimatedStartDate) <= newRecolection.EstimatedEndDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) >= newRecolection.EstimatedEndDate)) ||
                    (((x.RealStartDate ?? x.EstimatedStartDate) > newRecolection.EstimatedStartDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) < newRecolection.EstimatedEndDate))
                );

            return busyEmployee;
        }

        public async Task<bool> ValidateVehicle(Recolection newRecolection)
        {
            var oldRecolections = await _uow.RecolectionRepository.GetByVehicleId(newRecolection.VehicleId);

            var busyVehicle =
                oldRecolections.Any(x =>
                    (((x.RealStartDate ?? x.EstimatedStartDate) <= newRecolection.EstimatedStartDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) >= newRecolection.EstimatedStartDate)) ||
                    (((x.RealStartDate ?? x.EstimatedStartDate) <= newRecolection.EstimatedEndDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) >= newRecolection.EstimatedEndDate || x?.RealEndDate >= newRecolection.EstimatedEndDate)) ||
                    (((x.RealStartDate ?? x.EstimatedStartDate) > newRecolection.EstimatedStartDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) < newRecolection.EstimatedEndDate))
                 );

            return busyVehicle;
        }
    }
}
