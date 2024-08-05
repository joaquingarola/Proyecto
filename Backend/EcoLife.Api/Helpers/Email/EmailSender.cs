using System.Net.Mail;
using System.Net;
using EcoLife.Api.Entities;
using EcoLife.Api.Data.Constants;

namespace EcoLife.Api.Helpers.Email
{
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string password, string type)
        {
            var emailInfo = type == EmailType.Create ? getNewText() : getEditText();

            var client = new SmtpClient("smtp-mail.outlook.com", 587)
            {
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("ecolifeupdates@outlook.com", "Ecolife2023."),
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            MailMessage mailMessage = new MailMessage("ecolifeupdates@outlook.com", email);
            mailMessage.Subject = emailInfo.Subject;
            mailMessage.Body =
                emailInfo.Title +
                emailInfo.Content +
                $"<p><b>Usuario:</b> {email}</p>" +
                $"<p><b>Contraseña:</b> {password}</p>";
            mailMessage.IsBodyHtml = true;

            return client.SendMailAsync(mailMessage);
        }

        private EmailInfo getNewText()
        {
            var info = new EmailInfo()
            {
                Subject = "Alta en Ecolife",
                Title = "<h2>¡Bienvenido a Ecolife!</h2>",
                Content = "<p>Aquí le dejaremos las credenciales para realizar el primer ingreso, ¡luego podrá cambiarlas!</p>"
            };

            return info;
        }

        private EmailInfo getEditText()
        {
            var info = new EmailInfo()
            {
                Subject = "Reestablecer contraseña - Ecolife",
                Title = "<h2>Instrucciones:</h2>",
                Content = "<p>Inicie sesión con las siguientes credenciales, luego podrá cambiar la contraseña.</p>"
            };

            return info;
        }
    }
}
