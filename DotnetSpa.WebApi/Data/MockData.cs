using DotnetSpa.WebApi.Models;

namespace DotnetSpa.WebApi.Data;

internal class MockData
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

    public static List<Order> CustomerOrders =
        new List<Order>
        {
            new Order
            {
                Id = 1,
                CustomerId = 1,
                TotalPrice = 12.34m
            },
            new Order
            {
                Id = 2,
                CustomerId = 1,
                TotalPrice = 23.45m
            },
            new Order
            {
                Id = 2,
                CustomerId = 2,
                TotalPrice = 34.56m
            }
        };
}
