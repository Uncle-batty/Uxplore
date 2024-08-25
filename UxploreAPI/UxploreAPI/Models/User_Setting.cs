using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UXplore.Models
{
    public class User_Setting
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column("userId")]
        public int UserId { get; set; }  // Use UserId to match the database column name

        [Required]
        public int Push_Notices { get; set; }

        [Required]
        public int Hide_Account { get; set; }  // Renamed to match Pascal casing

        [Required]
        public int Account_Suggestions { get; set; }  // Renamed to match Pascal casing

        [Required]
        public int Trending_Places { get; set; }  // Renamed to match Pascal casing

        [Required]
        public int Reminders { get; set; }
    }
}
