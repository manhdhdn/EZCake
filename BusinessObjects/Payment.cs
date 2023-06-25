using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class Payment
    {
        public Guid Id { get; set; }
        public string PartnerCode { get; set; } = null!;
        public string RequestId { get; set; } = null!;
        public string OrderId { get; set; } = null!;
        public string Signature { get; set; } = null!;
        public string Lang { get; set; } = null!;
        public Guid OrderUni { get; set; }

        public virtual Order? OrderUniNavigation { get; set; }
    }
}
