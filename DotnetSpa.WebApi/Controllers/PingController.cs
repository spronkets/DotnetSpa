using Microsoft.AspNetCore.Mvc;

namespace DotnetSpa.WebApi.Controllers
{
    [Route("api/ping")]
    [ApiController]
    public class PingController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("Pong!");
        }
    }
}
