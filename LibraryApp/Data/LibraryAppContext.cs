using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LibraryApp.Model;

namespace LibraryApp.Data
{
    public class LibraryAppContext : DbContext
    {
        public LibraryAppContext (DbContextOptions<LibraryAppContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Rent>()
                .HasKey(r => new { r.UserId, r.ISBN });

            modelBuilder.Entity<UserContact>()
                .HasKey(uc => new { uc.UserId, uc.Type });
        }

        public DbSet<User> User { get; set; }
        public DbSet<Rent> Rent { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<UserContact> UserContact { get; set; }

    }
}
