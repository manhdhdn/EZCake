using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using EZCake.BusinessObjects;

namespace EZCake.BusinessObjects.Context
{
    public partial class EZCakeContext : DbContext
    {
        public EZCakeContext()
        {
        }

        public EZCakeContext(DbContextOptions<EZCakeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Cake> Cakes { get; set; } = null!;
        public virtual DbSet<CakeIngredient> CakeIngredients { get; set; } = null!;
        public virtual DbSet<CakeReview> CakeReviews { get; set; } = null!;
        public virtual DbSet<Ingredient> Ingredients { get; set; } = null!;
        public virtual DbSet<IngredientType> IngredientTypes { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<Review> Reviews { get; set; } = null!;
        public virtual DbSet<ShippingInformation> ShippingInformations { get; set; } = null!;
    }
}
