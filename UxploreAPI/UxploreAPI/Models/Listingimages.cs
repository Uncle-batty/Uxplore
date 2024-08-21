using System.ComponentModel.DataAnnotations;

namespace UxploreAPI.Models
{
   
        public class ListingImage
        {
            [Key]
            public int Id { get; set; }

            [Required]
            public int ListingId { get; set; }

            [Required]
            public string Image { get; set; } // base64 format
        }
}

