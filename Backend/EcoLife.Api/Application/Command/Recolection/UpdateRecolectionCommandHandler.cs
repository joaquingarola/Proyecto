using AutoMapper;

using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos.Response;
using EcoLife.Api.Entities;
using EcoLife.Api.Services.Interfaces;

using MediatR;

namespace EcoLife.Api.Application
{
    public class UpdateRecolectionCommandHandler : IRequestHandler<UpdateRecolectionCommand, CreateRecolectionResponseDto>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptimizationService _optimizationService;

        public UpdateRecolectionCommandHandler(IUnitOfWork uow, IMapper mapper, IOptimizationService optimizationService)
        {
            _uow = uow;
            _mapper = mapper;
            _optimizationService = optimizationService;
        }

        public async Task<CreateRecolectionResponseDto> Handle(UpdateRecolectionCommand command, CancellationToken cancellationToken)
        {
            var updateOrderRoute = false;

            var existingRecolection = await _uow.RecolectionRepository.GetByIdAsync(command.Id);

            if (command.WasteCenterId != existingRecolection.WasteCenterId || command.VehicleCenterId != existingRecolection.VehicleCenterId)
            {
                updateOrderRoute = true;
            }

            _mapper.Map(command, existingRecolection);

            if (await ValidateEmployee(existingRecolection))
                return new CreateRecolectionResponseDto() { Success = false, Message = "El recolector tiene otra recolección en ese horario." };

            if (await ValidateVehicle(existingRecolection))
                return new CreateRecolectionResponseDto() { Success = false, Message = "El vehículo esta asignado a otra recolección en ese horario." };

            var result = await _uow.RecolectionRepository.Update(existingRecolection);

            if (updateOrderRoute)
            {
                await _optimizationService.OrderContainersRoute(result.Id);
            }

            return new CreateRecolectionResponseDto() { Success = true, Id = result.Id };
        }

        public async Task<bool> ValidateEmployee(Recolection newRecolection)
        {
            var oldRecolections = await _uow.RecolectionRepository.GetByEmployeeId(newRecolection.EmployeeId);

            var busyEmployee =
                oldRecolections.Any(x =>
                    ((((x.RealStartDate ?? x.EstimatedStartDate) <= newRecolection.EstimatedStartDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) >= newRecolection.EstimatedStartDate)) ||
                    (((x.RealStartDate ?? x.EstimatedStartDate) <= newRecolection.EstimatedEndDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) >= newRecolection.EstimatedEndDate)) ||
                    (((x.RealStartDate ?? x.EstimatedStartDate) > newRecolection.EstimatedStartDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) < newRecolection.EstimatedEndDate))) &&
                    x.Id != newRecolection.Id);

            return busyEmployee;
        }

        public async Task<bool> ValidateVehicle(Recolection newRecolection)
        {
            var oldRecolections = await _uow.RecolectionRepository.GetByVehicleId(newRecolection.VehicleId);

            var busyVehicle =
                oldRecolections.Any(x =>
                    ((((x.RealStartDate ?? x.EstimatedStartDate) <= newRecolection.EstimatedStartDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) >= newRecolection.EstimatedStartDate)) ||
                    (((x.RealStartDate ?? x.EstimatedStartDate) <= newRecolection.EstimatedEndDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) >= newRecolection.EstimatedEndDate || x?.RealEndDate >= newRecolection.EstimatedEndDate)) ||
                    (((x.RealStartDate ?? x.EstimatedStartDate) > newRecolection.EstimatedStartDate) &&
                    ((x.RealEndDate ?? x.EstimatedEndDate) < newRecolection.EstimatedEndDate))) &&
                    x.Id != newRecolection.Id);

            return busyVehicle;
        }
    }
}
