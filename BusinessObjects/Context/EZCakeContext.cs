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
        public virtual DbSet<Ingredient> Ingredients { get; set; } = null!;
        public virtual DbSet<IngredientType> IngredientTypes { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Review> Reviews { get; set; } = null!;
        public virtual DbSet<ShippingInformation> ShippingInformations { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasIndex(e => e.Email, "IX_Accounts")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Role)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Cake>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Image).IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Price)
                    .HasColumnType("decimal(18, 0)")
                    .HasDefaultValueSql("((30000))");

                entity.Property(e => e.Status)
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CakeIngredient>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Cake)
                    .WithMany(p => p.CakeIngredients)
                    .HasForeignKey(d => d.CakeId)
                    .HasConstraintName("FK_CakeIngredients_Cakes");

                entity.HasOne(d => d.Ingredient)
                    .WithMany(p => p.CakeIngredients)
                    .HasForeignKey(d => d.IngredientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CakeIngredients_Ingredients");
            });

            modelBuilder.Entity<Ingredient>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Image).IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.IngredientType)
                    .WithMany(p => p.Ingredients)
                    .HasForeignKey(d => d.IngredientTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ingredients_IngredientTypes");
            });

            modelBuilder.Entity<IngredientType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Image).IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.Property(e => e.ShippedDate).HasColumnType("datetime");

                entity.Property(e => e.Status)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.HasOne(d => d.ShippingInformation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.ShippingInformationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Orders_ShippingInformations");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.OrderId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.Cake)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.CakeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderDetail_Cakes");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_OrderDetail_Orders");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasIndex(e => e.OrderUni, "IX_Payments")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Lang)
                    .HasMaxLength(2)
                    .IsFixedLength();

                entity.Property(e => e.OrderId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PartnerCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RequestId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Signature)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.OrderUniNavigation)
                    .WithOne(p => p.Payment)
                    .HasForeignKey<Payment>(d => d.OrderUni)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Payments_Orders");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Comment).HasMaxLength(300);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reviews_Accounts");

                entity.HasOne(d => d.Cake)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.CakeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reviews_Cakes");
            });

            modelBuilder.Entity<ShippingInformation>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Address).HasMaxLength(300);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.ShippingInformations)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ShippingInformations_Accounts");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
