using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class CakeIngredient
    {
        public Guid Id { get; set; }
        public Guid CakeId { get; set; }
        public Guid IngredientId { get; set; }

        public virtual Cake Cake { get; set; } = null!;
        public virtual Ingredient Ingredient { get; set; } = null!;
    }
}
