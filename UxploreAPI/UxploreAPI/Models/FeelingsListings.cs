using System.Collections.Generic;

namespace UXplore.Models
{
    public class FeelingsListings
    {
        public int Id { get; set; }
        public string Feeling { get; set; }
        public List<int> ListingIds { get; set; }
    }
}
