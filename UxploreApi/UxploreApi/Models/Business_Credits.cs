using System.ComponentModel.DataAnnotations;

namespace UxploreAPI.Models
{
    public class Business_Credits
    {
        [Key]
        public int ID { get; set; }

        public int User_id { get; set; }

        public int Available_Credits { get; set; }
    }
}
