using DotnetSpa.WebApi.Data;
using DotnetSpa.WebApi.Interfaces;
using DotnetSpa.WebApi.Models;

namespace DotnetSpa.WebApi.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly List<Customer> _customers = MockData.Customers;

        public List<Customer> GetCustomers()
        {
            var customers = _customers.OrderBy(c => c.Id).ToList();
            return customers;
        }

        public Customer GetCustomer(long customerId)
        {
            var customer = _customers.SingleOrDefault(c => c.Id == customerId);
            return customer;
        }

        public Customer MergeCustomer(long customerId, MergeCustomerRequest request)
        {
            var existingCustomer = _customers.SingleOrDefault(c => c.Id == customerId);
            if (existingCustomer == null)
            {
                var customer =
                    new Customer
                    {
                        Id = _customers.Max(c => c.Id) + 1,
                        FirstName = request.FirstName,
                        LastName = request.LastName
                    };
                _customers.Add(customer);
            }
            else
            {
                existingCustomer.FirstName = request.FirstName;
                existingCustomer.LastName = request.LastName;
            }

            return existingCustomer;
        }

        public bool DeleteCustomer(long customerId)
        {
            var customer = _customers.SingleOrDefault(c => c.Id == customerId);
            if (customer != null)
            {
                _customers.Remove(customer);
                return true;
            }

            return false;
        }
    }
}
