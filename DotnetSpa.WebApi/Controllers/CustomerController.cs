using DotnetSpa.WebApi.Data;
using DotnetSpa.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetSpa.WebApi.Controllers;

[Route("api/customer/{customerId}")]
[ApiController]
public class CustomerController : ControllerBase
{
    [HttpGet]
    public ActionResult<Customer> GetCustomer([FromRoute] long customerId)
    {
        var customer = MockCustomers.Customers.SingleOrDefault(c => c.Id == customerId);
        return Ok(customer);
    }

    [HttpPut]
    public ActionResult MergeCustomer([FromRoute] long customerId, [FromBody] MergeCustomerRequest request)
    {
        var existingCustomer = MockCustomers.Customers.SingleOrDefault(c => c.Id == customerId);
        if (existingCustomer == null)
        {
            var customer =
                new Customer
                {
                    Id = MockCustomers.Customers.Max(c => c.Id) + 1,
                    FirstName = request.FirstName,
                    LastName = request.LastName
                };
            MockCustomers.Customers.Add(customer);
        }
        else
        {
            existingCustomer.FirstName = request.FirstName;
            existingCustomer.LastName = request.LastName;
        }

        return Ok();
    }

    [HttpDelete]
    public ActionResult DeleteCustomer([FromRoute] long customerId)
    {
        var existingCustomerIndex = MockCustomers.Customers.FindIndex(c => c.Id == customerId);
        if (existingCustomerIndex != -1)
        {
            MockCustomers.Customers.RemoveAt(existingCustomerIndex);
        }

        return Ok();
    }
}
