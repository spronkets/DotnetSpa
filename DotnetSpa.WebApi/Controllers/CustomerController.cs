using DotnetSpa.WebApi.Interfaces;
using DotnetSpa.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetSpa.WebApi.Controllers;

[Route("api/customer/{customerId}")]
[ApiController]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpGet]
    public ActionResult<Customer> GetCustomer([FromRoute] long customerId)
    {
        var customer = _customerService.GetCustomer(customerId);
        return Ok(customer);
    }

    [HttpPut]
    public ActionResult MergeCustomer([FromRoute] long customerId, [FromBody] MergeCustomerRequest request)
    {
        var customer = _customerService.MergeCustomer(customerId, request);
        return Ok(customer);
    }

    [HttpDelete]
    public ActionResult DeleteCustomer([FromRoute] long customerId)
    {
        var isDeleted = _customerService.DeleteCustomer(customerId);

        if (!isDeleted)
        {
            Console.WriteLine($"Customer {customerId} has already been deleted.");
        }

        return Ok();
    }
}
