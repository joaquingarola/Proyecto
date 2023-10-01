using AutoMapper;

using EcoLife.Api.Data.Constants;
using EcoLife.Api.Entities;

using System.Security.Cryptography;

namespace EcoLife.Api.MapperProfiles.Resolvers
{
    public class RandomPasswordResolver : IValueResolver<Employee, object, string>
    {
        public string Resolve(Employee source, object destination, string destMember, ResolutionContext context)
        {
            byte[] rgb = new byte[20];
            RNGCryptoServiceProvider rngCrypt = new RNGCryptoServiceProvider();
            rngCrypt.GetBytes(rgb);
            return Convert.ToBase64String(rgb);
        }
    }
}
