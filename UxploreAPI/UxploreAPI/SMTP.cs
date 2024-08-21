using System;
using System.ComponentModel;
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

        public void sendConformationEmail(string useremail, string username)
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
            background-image: radial-gradient(circle at center center, rgba(79,22,97, 0.05) 0%, rgba(79,22,97, 0.05) 15%,rgba(91,13,123, 0.05) 15%, rgba(91,13,123, 0.05) 34%,rgba(73,34,126, 0.05) 34%, rgba(73,34,126, 0.05) 51%,rgba(237, 237, 237,0.05) 51%, rgba(237, 237, 237,0.05) 75%,rgba(83,25,123, 0.05) 75%, rgba(83,25,123, 0.05) 89%,rgba(28,9,37, 0.05) 89%, rgba(28,9,37, 0.05) 100%),radial-gradient(circle at center center, rgb(8,8,8) 0%, rgb(8,8,8) 6%,rgb(8,8,8) 6%, rgb(8,8,8) 12%,rgb(8,8,8) 12%, rgb(8,8,8) 31%,rgb(8,8,8) 31%, rgb(8,8,8) 92%,rgb(8,8,8) 92%, rgb(8,8,8) 97%,rgb(8,8,8) 97%, rgb(8,8,8) 100%); background-size: 42px 42px;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 5px;
            padding: 20px;
            text-align: center;
            }
            .email-header {
            background: linear-gradient(to right, #3f3d3d, rgb(8, 7, 7));
            color: white;
            padding: 10px 0;
            border-radius: 5px 5px 0 0;
            border: 3px solid #ffffff; /* Adjusted the border width and added the shorthand property */
        }

        .email-header img {
            max-width: 150px;
            margin-bottom: 10px;
        }
        .email-body {
            padding: 20px;
            color: white;
        }
        .email-footer {
            background-color: #f4f4f4;
            color: #888888;
            padding: 10px;
            border-radius: 0 0 5px 5px;
        }
        .btn-confirm {
            background: linear-gradient(to right, black, #4CAF50);
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
            <img src='https://i.ibb.co/qWsTJDv/Logo.png' alt='Your Company Logo'>
            <h1>Thank You for Signing Up!</h1>
        </div>
        <div class='email-body'>
            <p>Hi {username},</p>
            <p>Thank you for signing up at UXPlore. We're excited to have you explore your travel interests based on your mood.</p>
                <style>
        @keyframes slide {
            0% { transform: translateX(0%); }
            20% { transform: translateX(0%); }
            25% { transform: translateX(-100%); }
            45% { transform: translateX(-100%); }
            50% { transform: translateX(-200%); }
            70% { transform: translateX(-200%); }
            75% { transform: translateX(-300%); }
            95% { transform: translateX(-300%); }
            100% { transform: translateX(0%); }
        }

        .carousel-container {
            width: 100%;
            overflow: hidden;
            position: relative;
        }

        .carousel {
            display: flex;
            width: 400%;
            animation: slide 6s infinite;
        }

        .carousel img {
            width: 25%;
            transition: transform 4s;
        }
    </style>
</head>
<body>
    <div class='email-body'>

        
            <h3>We Find...U Explore</h3>
        </div>
        <div class='email-footer'>
            <p>&copy; 2024 Uxplore.All rights reserved.</p>
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
