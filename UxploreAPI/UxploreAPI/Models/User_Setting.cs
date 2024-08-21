using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UXplore.Models
{
    public class User_Setting
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("User")]
        public int User_ID { get; set; }

 

        public int Push_Notices { get; set; }
        public int hide_account { get; set; }

        public int Account_suggestions { get; set; }
        public int Trending_places { get; set; }
        public int Reminders { get; set; }
    }
}
 