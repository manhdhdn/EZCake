﻿using System;
using System.Collections.Generic;

namespace EZCake.BusinessObjects
{
    public partial class Ingredient
    {
        public Ingredient()
        {
            CakeIngredients = new HashSet<CakeIngredient>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Image { get; set; }
        public Guid IngredientTypeId { get; set; }

        public virtual IngredientType? IngredientType { get; set; }
        public virtual ICollection<CakeIngredient> CakeIngredients { get; set; }
    }
}
