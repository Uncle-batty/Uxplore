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
        public User user { get; set; }
        [Required]
        [ForeignKey("Category")]
        public int Catagory_ID { get; set; }
        public Category category { get; set; }

    }
}
