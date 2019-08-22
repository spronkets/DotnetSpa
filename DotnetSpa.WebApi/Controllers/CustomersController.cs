using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NodeDotnet.WebApi.MockData;
using NodeDotnet.WebApi.Models;

namespace NodeDotnet.WebApi.Controllers
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
