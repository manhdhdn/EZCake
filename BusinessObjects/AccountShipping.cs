﻿using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class AccountShipping
    {
        public AccountShipping()
        {
            Orders = new HashSet<Order>();
        }

        public Guid Id { get; set; }
        public Guid AccountId { get; set; }
        public Guid ShippingInformationId { get; set; }

        //public virtual Account? Account { get; set; }
        public virtual ShippingInformation? ShippingInformation { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
