using DotnetSpa.WebApi.Models;

namespace DotnetSpa.WebApi.Data;

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
            },
            new Customer
            {
                Id = 2,
                FirstName = "Marge",
                LastName = "Simpson"
            },
            new Customer
            {
                Id = 3,
                FirstName = "Ned",
                LastName = "Flanders"
            }
        };
}
