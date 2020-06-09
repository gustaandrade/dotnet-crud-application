using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace dotnet_crud_application.Models
{
    public class AdContext: DbContext
    {
        public AdContext(DbContextOptions<AdContext> options) : base(options)
        {
        }

        public DbSet<AdItem> AdItems { get; set; }
    }
}
