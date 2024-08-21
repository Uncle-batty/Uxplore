using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UXplore.Models
{
    public class User_Interactions
    {
        [Key]
        public int ID { get; set; }

        public int Event_ID { get; set; }

        public int Listing_ID { get; set; }

        [Required]
        [ForeignKey("User")]
        public int User_ID { get; set; }


        [Required]
        public string Interaction_Type { get; set; }

        public DateTime Interaction_Date { get; set; }
        
    }
}
