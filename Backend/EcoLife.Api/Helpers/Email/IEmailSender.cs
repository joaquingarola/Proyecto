namespace EcoLife.Api.Helpers.Email
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string password);
    }
}
