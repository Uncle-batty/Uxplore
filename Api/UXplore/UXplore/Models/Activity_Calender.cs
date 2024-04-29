using System.ComponentModel.DataAnnotations;

namespace UXplore.Models
{
    public class Activity_Calender
    {
        [Key]
        public int Id { get; set; }
        public int Event_ID { get; set; }
        public int Listing_ID { get; set; }

        [Required]
        public int User_ID { get; set; }
        [Required]
        public string Time {  get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
