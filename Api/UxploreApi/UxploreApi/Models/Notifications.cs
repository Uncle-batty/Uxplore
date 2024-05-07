using System.ComponentModel.DataAnnotations;

namespace UXplore.Models
{
    public class Notifications
    {
        [Key] 
        public int Id { get; set; }
        [Required]
        public int User_ID { get; set; }
        [Required]
        public string Heading{ get; set;}
        [Required]
        public string Content { get; set;}
        [Required]
        public DateTime Date{ get; set;}
    }
}
