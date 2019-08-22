using Microsoft.AspNetCore.Mvc;

namespace NodeDotnet.WebApi.Controllers
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
