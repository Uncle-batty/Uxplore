using System.ComponentModel.DataAnnotations;

namespace UXplore.Models
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }
       
        public int  Event_ID { get; set; }
        [Required]
        public int List_ID { get; set; }
        [Required]
        public int User_id { get; set; }
        [Required]
        public int Ratevalue { get; set; }
        [Required]
        public string type { get; set; }

    }
}
