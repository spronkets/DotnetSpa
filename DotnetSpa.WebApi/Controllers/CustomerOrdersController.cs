using System.Collections.Generic;
using System.Linq;
using DotnetSpa.WebApi.Data;
using DotnetSpa.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetSpa.WebApi.Controllers
{
    [Route("api/customer/{customerId}/orders")]
    [ApiController]
    public class CustomerOrdersController : ControllerBase
    {
        private List<Order> Orders => MockOrders.Orders;

        [HttpGet]
        public ActionResult<List<Order>> GetOrders([FromRoute]long customerId)
        {
            var orders = Orders.Where(c => c.Id == customerId);
            return Ok(orders);
        }

        [HttpPost]
        public ActionResult CreateOrder([FromRoute]long customerId, [FromBody]CreateOrderRequest request)
        {
            var order =
                new Order
                {
                    Id = Orders.Max(c => c.Id) + 1,
                    CustomerId = customerId,
                    TotalPrice = request.TotalPrice
                };

            Orders.Add(order);

            return Ok();
        }
    }
}
