using System.Security.Cryptography;

using EcoLife.Api.Helpers.Email;

using EcoLife.Api.DataAccess.UnitOfWork;

using MediatR;
using EcoLife.Api.Data.Constants;

namespace EcoLife.Api.Application.Command.Auth
{
    public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand>
    {
        private readonly IUnitOfWork _uow;
        private readonly IEmailSender _emailSender;

        public ResetPasswordCommandHandler(IUnitOfWork unitOfWork, IEmailSender emailSender)
        {
            _uow = unitOfWork;
            _emailSender = emailSender;
        }

        public async Task Handle(ResetPasswordCommand command, CancellationToken cancellationToken)
        {
            var user = await _uow.UserRepository.GetByUser(command.UserName);

            if (user == null)
                return;

            var newPassword = GeneratePassword();

            user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);

            user.IsFirstEntry = true;

            await _uow.UserRepository.Update(user);

            await _emailSender.SendEmailAsync(user.Username, newPassword, EmailType.Edit);
        }

        private static string GeneratePassword()
        {
            byte[] rgb = new byte[20];
            RNGCryptoServiceProvider rngCrypt = new RNGCryptoServiceProvider();
            rngCrypt.GetBytes(rgb);
            return Convert.ToBase64String(rgb);
        }
    }
}
