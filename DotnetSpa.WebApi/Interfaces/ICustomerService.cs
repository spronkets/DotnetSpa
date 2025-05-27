using DotnetSpa.WebApi.Models;

namespace DotnetSpa.WebApi.Interfaces
{
    public interface ICustomerService
    {
        List<Customer> GetCustomers();

        Customer GetCustomer(long customerId);

        Customer MergeCustomer(long customerId, MergeCustomerRequest request);

        bool DeleteCustomer(long customerId);
    }
}
