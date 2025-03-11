using DotnetSpa.WebApi.Data;
using DotnetSpa.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetSpa.WebApi.Controllers;

[Route("api/customer/{customerId}/orders")]
[ApiController]
public class CustomerOrdersController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Order>> GetOrders([FromRoute] long customerId)
    {
        var orders = MockOrders.Orders.Where(c => c.Id == customerId);
        return Ok(orders);
    }

    [HttpPost]
    public ActionResult CreateOrder([FromRoute] long customerId, [FromBody] CreateOrderRequest request)
    {
        var order =
            new Order
            {
                Id = MockOrders.Orders.Max(c => c.Id) + 1,
                CustomerId = customerId,
                TotalPrice = request.TotalPrice
            };

        MockOrders.Orders.Add(order);

        return Ok();
    }
}
