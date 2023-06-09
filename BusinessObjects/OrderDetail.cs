using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class OrderDetail
    {
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }
        public Guid CakeId { get; set; }
        public Guid Price { get; set; }
        public int Quantity { get; set; }

        public virtual Cake? Cake { get; set; }
        public virtual Order? Order { get; set; }
    }
}
