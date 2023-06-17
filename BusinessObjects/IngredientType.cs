using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class IngredientType
    {
        public IngredientType()
        {
            Ingredients = new HashSet<Ingredient>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Image { get; set; }

        public virtual ICollection<Ingredient> Ingredients { get; set; }
    }
}
