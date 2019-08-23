namespace DotnetSpa.WebApi.Models
{
    public class Order
    {
        public long Id { get; set; }
        public long CustomerId { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
