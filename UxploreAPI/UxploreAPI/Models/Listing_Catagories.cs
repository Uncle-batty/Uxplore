using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;

namespace UXplore.Models
{
    public class Listing_Catagories
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CatagoryId { get; set; }

        [Required]
        public int Listing_ID { get; set; }

    }

}
