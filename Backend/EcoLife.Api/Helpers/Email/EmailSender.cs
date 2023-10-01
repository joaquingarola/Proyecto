using System.Net.Mail;
using System.Net;

namespace EcoLife.Api.Helpers.Email
{
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string password)
        {
            var client = new SmtpClient("smtp-mail.outlook.com", 587)
            {
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("ecolifeupdates@outlook.com", "Ecolife2023."),
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            MailMessage mailMessage = new MailMessage("ecolifeupdates@outlook.com", email);
            mailMessage.Subject = "Alta en Ecolife";
            mailMessage.Body =
                "<h2>¡Bienvenido a Ecolife!</h2>" +
                "<p>Aquí le dejaremos las credenciales para realizar el primer ingreso, luego podrá cambiarlas!</p>" +
                $"<p><b>Usuario:</b> {email}</p>" +
                $"<p><b>Contraseña:</b> {password}</p>";
            mailMessage.IsBodyHtml = true;

            return client.SendMailAsync(mailMessage);
        }
    }
}
