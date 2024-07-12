using EcoLife.Api.DataAccess.UnitOfWork;
using EcoLife.Api.Dtos.Response;
using static EcoLife.Api.Helpers.JwtHelper;

using AutoMapper;

using MediatR;


namespace EcoLife.Api.Application
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, UserResponseDto>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;

        public LoginCommandHandler(IUnitOfWork uow, IMapper mapper, JwtService jwtService)
        {
            _uow = uow;
            _mapper = mapper;
            _jwtService = jwtService;
        }

        public async Task<UserResponseDto> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            var user = await _uow.UserRepository.GetByUser(command.Username);
            
            if (user == null)
                return new UserResponseDto() { Success = false };

            if (!BCrypt.Net.BCrypt.Verify(command.Password, user.Password))
                return new UserResponseDto() { Success = false };

            var jwt = _jwtService.Generate(user);

            var response = _mapper.Map<UserResponseDto>(user);

            response.Employee.Id = user.Employee.Id;

            response.Success = true;

            response.Token = jwt;

            return response;
        }
    }
}
