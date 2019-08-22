using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NodeDotnet.WebApi.MockData;
using NodeDotnet.WebApi.Models;

namespace NodeDotnet.WebApi.Controllers
{
    [Route("api/customer/{customerId}")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private List<Customer> Customers => MockCustomers.Customers;

        [HttpGet]
        public ActionResult<Customer> GetCustomer([FromRoute]long customerId)
        {
            var customer = Customers.SingleOrDefault(c => c.Id == customerId);
            return Ok(customer);
        }

        [HttpPut]
        public ActionResult MergeCustomer([FromRoute]long customerId, [FromBody]MergeCustomerRequest request)
        {
            var existingCustomer = Customers.SingleOrDefault(c => c.Id == customerId);
            if (existingCustomer == null)
            {
                var customer =
                    new Customer
                    {
                        Id = Customers.Max(c => c.Id) + 1,
                        FirstName = request.FirstName,
                        LastName = request.LastName
                    };
                Customers.Add(customer);
            }
            else
            {
                existingCustomer.FirstName = request.FirstName;
                existingCustomer.LastName = request.LastName;
            }

            return Ok();
        }

        [HttpDelete]
        public ActionResult DeleteCustomer([FromRoute]long customerId)
        {
            var existingCustomerIndex = Customers.FindIndex(c => c.Id == customerId);
            if (existingCustomerIndex != -1)
            {
                Customers.RemoveAt(existingCustomerIndex);
            }

            return Ok();
        }
    }
}
