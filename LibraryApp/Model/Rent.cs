using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryApp.Model
{
    public class Rent
    {
        public int UserId { get; set; }
        public string ISBN { get; set; }
        public DateTime DateRented { get; set;}
        public int Duration { get; set; }
    }
}
