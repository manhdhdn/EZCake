using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class Review
    {
        public Review()
        {
            CakeReviews = new HashSet<CakeReview>();
        }

        public Guid Id { get; set; }
        public int Rating { get; set; }
        public string Name { get; set; } = null!;
        public string Comment { get; set; } = null!;

        public virtual ICollection<CakeReview> CakeReviews { get; set; }
    }
}
