using System.Collections.Generic;
using NodeDotnet.WebApi.Models;

namespace NodeDotnet.WebApi.MockData
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
