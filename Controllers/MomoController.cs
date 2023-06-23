using EZCake.Momo;
using Microsoft.AspNetCore.Mvc;

namespace EZCake.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MomoController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> PostMomo(MomoRequestModel momoRequestModel)
        {
            var jsonResponse = await PaymentRequest.SendPaymentRequest(momoRequestModel.Endpoint, momoRequestModel.PostJsonString);

            return Created("", new {data = jsonResponse});
        }
    }
}
