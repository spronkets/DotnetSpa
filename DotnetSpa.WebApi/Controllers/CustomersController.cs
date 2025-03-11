using DotnetSpa.WebApi.Data;
using DotnetSpa.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetSpa.WebApi.Controllers;

[Route("api/customers")]
[ApiController]
public class CustomersController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Customer>> GetCustomers()
    {
        return Ok(MockCustomers.Customers);
    }
}
