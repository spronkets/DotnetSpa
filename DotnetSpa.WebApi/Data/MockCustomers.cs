using System.Collections.Generic;
using DotnetSpa.WebApi.Models;

namespace DotnetSpa.WebApi.Data
{
    internal class MockCustomers
    {
        public static List<Customer> Customers =
            new List<Customer>
            {
                new Customer
                {
                    Id = 1,
                    FirstName = "Homer",
                    LastName = "Simpson"
                }
            };
    }
}
