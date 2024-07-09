using EcoLife.Api.Entities;

using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EcoLife.Api.Helpers
{
    public class JwtHelper
    {
        public class JwtService
        {
            private readonly IConfiguration configuration;

            public JwtService(IConfiguration configuration)
            {
                this.configuration = configuration;
            }

            public string Generate(User user)
            {
                var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("JWT:SecureKey").Value));
                var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
                var header = new JwtHeader(credentials);

                var payload = new JwtPayload(
                    configuration.GetSection("JWT:Issuer").Value,
                    configuration.GetSection("JWT:Audience").Value,
                    GenerateJWTClaims(user),
                    null,
                    DateTime.Today.AddDays(1));

                var securityToken = new JwtSecurityToken(header, payload);

                return new JwtSecurityTokenHandler().WriteToken(securityToken);
            }

            public JwtSecurityToken Verify(string jwt)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(configuration.GetSection("JWT:SecureKey").Value);
                tokenHandler.ValidateToken(jwt, new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false
                }, out SecurityToken validatedToken);

                return (JwtSecurityToken)validatedToken;
            }

            private List<Claim> GenerateJWTClaims(User user)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Employee.Role.Description)
                };

                return claims;
            }
        }
    }
}
