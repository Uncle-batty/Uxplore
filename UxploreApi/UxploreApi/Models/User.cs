using System.ComponentModel.DataAnnotations;

namespace UXplore.Models
{
    //Model for users 
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FName { get; set; }

        [Required]
        public string LName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string UserType{ get; set; }
    }
}
