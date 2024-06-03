using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UXplore.Models
{
    public class User_interests
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("User")]
        public int User_ID { get; set; }

        // Navigation property
        [Required]
        [ForeignKey("Category")]
        public int Category_ID { get; set; }  // Ensure correct spelling and casing
    }
}
