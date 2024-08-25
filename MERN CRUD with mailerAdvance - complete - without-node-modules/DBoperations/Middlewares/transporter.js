import nodemailer from "nodemailer";
import errorMiddleWare from "./error.js";
import responseMiddleWare from "./res.js";

// Create a transporter object with Gmail SMTP settings
const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail SMTP server
 
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "xxxx@gmail.com",
    pass: "xxx-xxxx-xxxx-xxxx",
  },
});

async function sendEmail(res, object_containing_email_token_id, subject) {
  try {
    // Set up email options
    const mailOptions = {
      from: "xxx@gmail.com", // Sender address
      to: object_containing_email_token_id.email, // List of recipients
      subject: subject, // Subject line
      text: "Thanks For Registration Please Click the link given below to proceed further!", // Plain text body
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
        <h2 style="text-align: center; color: #333333;">Email Verification</h2>
        <p style="text-align: center; color: #555555; font-size: 16px;">
          Thank you for registering! Please click the button below to verify your email address and complete your registration.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:5173/verify-email/${object_containing_email_token_id.user_id}/${object_containing_email_token_id.token}" style="display: inline-block; padding: 15px 30px; background-color: #4CAF50; color: white; text-decoration: none; font-size: 18px; font-weight: bold; border-radius: 5px;">
            Verify Email
          </a>
        </div>
        <p style="text-align: center; color: #999999; font-size: 14px;">
          If you did not create an account, please ignore this email.
        </p>
      </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return {
      response: true,
    };
  } catch (error) {
    // Handle any errors that occur during the sendMail process
    return { response: false };
  }
}

// Call the async function to send the email
export default sendEmail;
