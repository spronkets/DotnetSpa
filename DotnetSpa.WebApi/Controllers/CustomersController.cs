using DotnetSpa.WebApi.Interfaces;
using DotnetSpa.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetSpa.WebApi.Controllers;

[Route("api/customers")]
[ApiController]
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomersController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpGet]
    public ActionResult<List<Customer>> GetCustomers()
    {
        var customers = _customerService.GetCustomers();
        return Ok(customers);
    }
}
