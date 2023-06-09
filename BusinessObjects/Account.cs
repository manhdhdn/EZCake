using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class Account
    {
        public Account()
        {
            AccountShippings = new HashSet<AccountShipping>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;

        public virtual ICollection<AccountShipping> AccountShippings { get; set; }
    }
}
