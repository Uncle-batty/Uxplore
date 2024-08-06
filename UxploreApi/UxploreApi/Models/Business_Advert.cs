using System.ComponentModel.DataAnnotations;

namespace UxploreAPI.Models
{
    public class Business_Advert
    {
        [Key]
        public int id { get; set; }

        [Required]
        public int businessId { get; set; }

        [Required]
        public IFormFile? imageFile { get; set; }

        public string description { get; set; }

        public int eventId { get; set; }
    }
}
