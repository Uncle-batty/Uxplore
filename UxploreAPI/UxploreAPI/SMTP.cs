using System;
using System.Net;
using System.Net.Mail;


namespace UxploreAPI
{
    public class SMTP
    {
        public string senderEmail = "uxplore.app@gmail.com";
        public string senderPassword = "yphrhglsfrfuydjj";
        public SmtpClient smtpClient;
        public SMTP() {
            
            smtpClient = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true
            };

        }

        public void sendConformationEmail(string useremail)
        {
            string body = @"
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Thank You for Signing Up</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 5px;
            padding: 20px;
            text-align: center;
        }
        .email-header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            border-radius: 5px 5px 0 0;
        }
        .email-header img {
            max-width: 150px;
            margin-bottom: 10px;
        }
        .email-body {
            padding: 20px;
        }
        .email-footer {
            background-color: #f4f4f4;
            color: #888888;
            padding: 10px;
            border-radius: 0 0 5px 5px;
        }
        .btn-confirm {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
        .btn-confirm:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class='email-container'>
        <div class='email-header'>
            <img src='[Logo URL]' alt='Your Company Logo'>
            <h1>Thank You for Signing Up!</h1>
        </div>
        <div class='email-body'>
            <p>Hi [User's Name],</p>
            <p>Thank you for signing up for our service. We're excited to have you on board. Please click the button below to confirm your email address and complete your registration.</p>
            <a href='[Confirmation Link]' class='btn-confirm'>Confirm Email</a>
            <p>If you did not sign up for this account, you can ignore this email.</p>
        </div>
        <div class='email-footer'>
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>";
            MailMessage mailMessage = new MailMessage
            {
                From = new MailAddress(senderEmail),
                Subject = "Thank you for signing up for Uxplore",
                Body = body,
                IsBodyHtml = true,
            };

            // Add recipient
            mailMessage.To.Add(useremail);
            try
            {
                // Send the email
                smtpClient.Send(mailMessage);
                Console.WriteLine("Email sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending email: " + ex.Message);
            }
        }
    }
}
