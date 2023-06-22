using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class Account
    {
        public Account()
        {
            Reviews = new HashSet<Review>();
            ShippingInformations = new HashSet<ShippingInformation>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public bool? Gender { get; set; }
        public bool? Role { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<ShippingInformation> ShippingInformations { get; set; }
    }
}
