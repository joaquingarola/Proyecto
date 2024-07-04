using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos.Response;
using MediatR;

namespace EcoLife.Api.Application
{
    public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, ChangePasswordResponseDto>
    {
        private readonly IUnitOfWork _uow;

        public ChangePasswordCommandHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<ChangePasswordResponseDto> Handle(ChangePasswordCommand command, CancellationToken cancellationToken)
        {
            var user = await _uow.UserRepository.GetByUser(command.User);

            if (user == null)
                return new ChangePasswordResponseDto() { Success = false, Message = "No pudimos recuperar su usuario. Por favor contacte con un administrador." };

            if (user.Password == command.NewPassword)
                return new ChangePasswordResponseDto() { Success = false, Message = "La nueva contraseña no puede ser igual que la actual" };

            user.Password = BCrypt.Net.BCrypt.HashPassword(command.NewPassword);

            user.IsFirstEntry = false;

            await _uow.UserRepository.Update(user);

            return new ChangePasswordResponseDto() { Success = true};
        }
    }
}
