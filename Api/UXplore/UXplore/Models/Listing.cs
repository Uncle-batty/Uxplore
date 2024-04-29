using System.ComponentModel.DataAnnotations;

namespace UXplore.Models
{
    public class Listing
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Hours { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Order { get; set; }
        [Required]
        public int Reserve { get; set; }

        public string Site { get; set; }
        [Required]
        public float AVG_price { get; set; }
    }
}
