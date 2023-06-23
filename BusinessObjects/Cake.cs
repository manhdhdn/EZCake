using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class Cake
    {
        public Cake()
        {
            CakeIngredients = new HashSet<CakeIngredient>();
            OrderDetails = new HashSet<OrderDetail>();
            Reviews = new HashSet<Review>();
        }

        public Guid Id { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; }
        public int Sold { get; set; }
        public string? Image { get; set; }
        public string Status { get; set; } = null!;

        public virtual ICollection<CakeIngredient> CakeIngredients { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
