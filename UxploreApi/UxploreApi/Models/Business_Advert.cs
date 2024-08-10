using System.ComponentModel.DataAnnotations;

namespace UxploreAPI.Models
{
    public class Business_Advert
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int Business_ID { get; set; }

        [Required]
        public string Image_File { get; set; }

        public string Description { get; set; }

        public int Event_ID { get; set; }
    }
}
