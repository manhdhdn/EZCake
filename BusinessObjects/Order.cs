using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? ShippedDate { get; set; }
        public Guid ShippingInformationId { get; set; }
        public string Status { get; set; } = null!;

        public virtual ShippingInformation? ShippingInformation { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
