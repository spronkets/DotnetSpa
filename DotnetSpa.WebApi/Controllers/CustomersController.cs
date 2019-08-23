using System.Collections.Generic;
using DotnetSpa.WebApi.Data;
using DotnetSpa.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetSpa.WebApi.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private List<Customer> Customers => MockCustomers.Customers;
        
        [HttpGet]
        public ActionResult<List<Customer>> GetCustomers()
        {
            return Ok(Customers);
        }
    }
}
