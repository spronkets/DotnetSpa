using DotnetSpa.WebApi.Interfaces;
using DotnetSpa.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetSpa.WebApi.Controllers;

[Route("api/customer/{customerId}/orders")]
[ApiController]
public class CustomerOrdersController : ControllerBase
{
    private readonly ICustomerOrdersService _customerOrdersService;

    public CustomerOrdersController(ICustomerOrdersService customerOrdersService)
    {
        _customerOrdersService = customerOrdersService;
    }

    [HttpGet]
    public ActionResult<List<Order>> GetCustomerOrders([FromRoute] long customerId)
    {
        var orders = _customerOrdersService.GetCustomerOrders(customerId);
        return Ok(orders);
    }

    [HttpPost]
    public ActionResult<Order> CreateCustomerOrder([FromRoute] long customerId, [FromBody] CreateOrderRequest request)
    {
        var order = _customerOrdersService.CreateCustomerOrder(customerId, request);
        return Ok(order);
    }
}
