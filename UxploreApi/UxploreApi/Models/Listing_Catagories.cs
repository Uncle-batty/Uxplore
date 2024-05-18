using System.ComponentModel.DataAnnotations;

namespace UXplore.Models
{
    public class Listing_Catagories
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int CatagoryId { get; set; }
        [Required]
        public int Listing_ID { get; set; }
    }
}
