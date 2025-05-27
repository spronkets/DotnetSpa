using DotnetSpa.WebApi.Data;
using DotnetSpa.WebApi.Interfaces;
using DotnetSpa.WebApi.Models;

namespace DotnetSpa.WebApi.Services
{
    public class CustomerOrdersService : ICustomerOrdersService
    {
        private readonly List<Order> _customerOrders = MockData.CustomerOrders;

        public List<Order> GetCustomerOrders(long customerId)
        {
            var orders = _customerOrders.Where(c => c.Id == customerId).ToList();
            return orders;
        }

        public Order CreateCustomerOrder(long customerId, CreateOrderRequest request)
        {
            var order =
                new Order
                {
                    Id = _customerOrders.Max(c => c.Id) + 1,
                    CustomerId = customerId,
                    TotalPrice = request.TotalPrice
                };

            _customerOrders.Add(order);

            return order;
        }
    }
}
