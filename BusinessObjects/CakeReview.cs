using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class CakeReview
    {
        public Guid Id { get; set; }
        public Guid CakeId { get; set; }
        public Guid ReviewId { get; set; }

        public virtual Cake? Cake { get; set; }
        public virtual Review? Review { get; set; }
    }
}
