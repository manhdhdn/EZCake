using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace EZCake.Utils
{
    public class ClaimRequirementFilter : IAuthorizationFilter
    {
        readonly Claim _claim;

        public ClaimRequirementFilter(Claim claim)
        {
            _claim = claim;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var tokenHeader = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (tokenHeader == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var token = tokenHeader.Replace("Bearer ", "");
            var tokenHandler = new JwtSecurityTokenHandler();
            var decodedToken = tokenHandler.ReadJwtToken(token);

            var hasClaim = decodedToken.Claims.Any(c => c.Type == _claim.Type && c.Value == _claim.Value);

            if (!hasClaim)
            {
                context.Result = new ForbidResult();
            }
        }
    }
}