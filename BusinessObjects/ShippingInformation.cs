using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class ShippingInformation
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public bool Prioritisation { get; set; }

        public Guid AccountId { get; set; }
        public virtual Account? Account { get; set; }
    }
}
