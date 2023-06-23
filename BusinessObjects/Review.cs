using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class Review
    {
        public Guid Id { get; set; }
        public int Rating { get; set; }
        public string Name { get; set; } = null!;
        public string Comment { get; set; } = null!;
        public Guid CakeId { get; set; }
        public Guid AccountId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Cake? Cake { get; set; }
    }
}
