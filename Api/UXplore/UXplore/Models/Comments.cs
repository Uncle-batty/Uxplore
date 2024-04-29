using System.ComponentModel.DataAnnotations;

namespace UXplore.Models
{
    public class Comments
    {
        [Key]   
        public int Id { get; set; }
        public int Event_ID { get; set; }
        public int Listing_ID { get; set; }
        [Required]
        public string Comment { get; set; }
    }
}
