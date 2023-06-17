using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class Cake
    {
        public Cake()
        {
            CakeIngredients = new HashSet<CakeIngredient>();
            CakeReviews = new HashSet<CakeReview>();
            OrderDetails = new HashSet<OrderDetail>();
        }

        public Guid Id { get; set; }
        public string? Name { get; set; }
        public int Sold { get; set; }
        public string? Image { get; set; }

        public virtual ICollection<CakeIngredient> CakeIngredients { get; set; }
        public virtual ICollection<CakeReview> CakeReviews { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
