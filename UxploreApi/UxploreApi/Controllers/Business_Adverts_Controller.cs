using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UXplore.Context;
using UXplore.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using UxploreAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.Web;
using System.Net.Http.Headers;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UxploreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Business_Adverts_Controller : ControllerBase
    {
        private readonly string _merchantId = "10000100";
        private readonly string _merchantKey = "46f0cd694581a";
        private readonly string _passphrase = "jt7NOE43FZPn"; // Optional

        private readonly DataContext _context;
        private readonly IHttpClientFactory _clientFactory;

        public Business_Adverts_Controller(DataContext context, IHttpClientFactory clientFactory)
        {
            _context = context;
            _clientFactory = clientFactory;
        }
        // GET: 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Business_Advert>>> GetAds(int businessUserId = 0)
        {
            if (businessUserId == 0)
            {
                return await _context.business_Adverts.ToListAsync();
            }else
            {
                return await _context.business_Adverts.Where(ad => ad.Business_ID == businessUserId).ToListAsync();
            }
            
        }

        // GET api/<Business_Adverts_Controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Business_Advert>> GetUser(int id)
        {
            var ad = await _context.business_Adverts.FindAsync(id);

            if (ad == null)
            {
                return NotFound();
            }

            return ad;
        }

        // POST api/<Business_Adverts_Controller>
        [HttpPost]
        public async Task<ActionResult<Business_Advert>> PostAdvert(Business_Advert advert)
        {
            
            _context.business_Adverts.Add(advert);
            var ad = await _context.SaveChangesAsync();

            return Ok( );
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> deletAdvert(int id)
        {
            var ads = await _context.business_Adverts.FindAsync(id);
            if (ads == null)
            {
                return NotFound();
            }

            _context.business_Adverts.Remove(ads);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> updateAdvert(int id, Business_Advert advert)
        {
            if (id != advert.ID)
            {
                return BadRequest();
            }

            _context.Entry(advert).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            

            return NoContent();
        }

        [HttpPost("create-payment")]
        public async Task<IActionResult> CreatePayment([FromBody] PayFastRequest request)
        {

            // Generate signature
            var signature = GenerateSignature(request, _passphrase);
            request.Signature = signature;

            // Prepare payment URL (if you want to return it to the client)
            var paymentUrl = "https://sandbox.payfast.co.za/eng/process?" +
                $"merchant_id={_merchantId}&merchant_key={_merchantKey}&" +
                $"amount={request.Amount.ToString()}&item_name={request.ItemName}&" +
                $"return_url={request.ReturnUrl}&cancel_url={request.CancelUrl}&" +
                $"notify_url={request.NotifyUrl}&signature={request.Signature}";

            PayFastResponse response = new PayFastResponse();
            response.PaymentUrl = paymentUrl;
            response.Request = request;
            return Ok(response);
        }




        private string GenerateSignature(PayFastRequest request, string passphrase)
        {
            var data = new StringBuilder();

            // Append all fields as per PayFast's order, and URL encode
            data.Append($"merchant_id={HttpUtility.UrlEncode(_merchantId).Replace("%20", "+").ToUpper()}&");
            data.Append($"merchant_key={HttpUtility.UrlEncode(_merchantKey).Replace("%20", "+").ToUpper()}&");
            data.Append($"amount={HttpUtility.UrlEncode(request.Amount.ToString()).Replace("%20", "+").ToUpper()}&");
            data.Append($"item_name={HttpUtility.UrlEncode(request.ItemName).Replace("%20", "+").ToUpper()}&");
            data.Append($"return_url={HttpUtility.UrlEncode(request.ReturnUrl).Replace("%20", "+").ToUpper()}&");
            data.Append($"cancel_url={HttpUtility.UrlEncode(request.CancelUrl).Replace("%20", "+").ToUpper()}&");
            data.Append($"notify_url={HttpUtility.UrlEncode(request.NotifyUrl).Replace("%20", "+").ToUpper()}");

            // Add passphrase if it's not null or empty
            if (!string.IsNullOrEmpty(passphrase))
            {
                data.Append($"&passphrase={HttpUtility.UrlEncode(passphrase).Replace("%20", "+").ToUpper()}");
            }

            string dataToSign = data.ToString();

            // Generate MD5 hash
            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(dataToSign));
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }



        [HttpGet("generate-guid")]
        public IActionResult GenerateGuid()
        {
            try
            {
                var generatedGuid = Guid.NewGuid(); // Generate GUID
                return Ok(generatedGuid);
            }
            catch (Exception ex)
            {
                // Log the error and return a 500 status code
                Console.WriteLine($"Error generating GUID: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost("create-yoco-payment")]
        public async Task<IActionResult> CreateCheckoutAsync([FromBody] CheckoutRequestModel model, [FromQuery] Guid guid)
        {
            try
            {
                string secretKey = "sk_test_29ec9cdabB57agz93b245bc978ea";
                string url = "https://payments.yoco.com/api/checkouts";

                var body = new
                {
                    amount = model.Amount * 100,
                    currency = model.Currency,
                    successUrl = $"{model.SuccessUrl}?guid={guid}",
                    cancelUrl = model.CancelUrl,
                    failureUrl = model.FailureUrl,
                };

                var json = JsonSerializer.Serialize(body);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var client = _clientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", secretKey);

                var response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    // Return the response to your Angular application
                    return Ok(responseContent);
                }
                else
                {
                    // Handle the error if necessary
                    return StatusCode((int)response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                // Log the error and return a 500 status code
                Console.WriteLine($"Error creating checkout: {ex.Message}");
                return StatusCode(500);
            }
        }








    }
    public class PayFastRequest
    {
        
        public decimal Amount { get; set; }
        public string ItemName { get; set; }
        public string ReturnUrl { get; set; }
        public string CancelUrl { get; set; }
        public string NotifyUrl { get; set; }
        public string Signature { get; set; }
    }

   public class PayFastResponse
    {
        public string PaymentUrl { get; set; }
        public PayFastRequest Request { get; set; }
    }

    public class CheckoutRequestModel
    {
        public decimal Amount { get; set; }

        public string Currency {  get; set; }

        public string SuccessUrl { get; set; }

        public string CancelUrl { get; set; }

        public string FailureUrl { get; set; }
    }

}
