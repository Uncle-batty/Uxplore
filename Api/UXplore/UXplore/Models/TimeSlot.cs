﻿using System.ComponentModel.DataAnnotations;

namespace UXplore.Models
{
    public class Timeslot
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int Event_ID { get; set; }
        [Required]
        public int List_ID { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public TimeSpan Start_Time { get; set; }
        [Required]
        public TimeSpan End_Time { get; set; }
    }
}