using System.ComponentModel.DataAnnotations;

namespace UXplore.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Hours { get; set; }
        [Required]
        public string  Location { get; set; }
       
        public string Phone { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Reserve { get; set; }
        
        public string Site { get; set; }
        [Required]
        public string AVG_price { get; set; }
        [Required]
        public int Listing_ID { get; set; }
    }
}
