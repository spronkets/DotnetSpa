using DotnetSpa.WebApi.Models;

namespace DotnetSpa.WebApi.Interfaces
{
    public interface ICustomerOrdersService
    {
        List<Order> GetCustomerOrders(long customerId);

        Order CreateCustomerOrder(long customerId, CreateOrderRequest request);
    }
}
