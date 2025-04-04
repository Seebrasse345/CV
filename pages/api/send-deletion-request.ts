import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ResponseData = {
  message: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Traditional API route: deletion request received');
  
  try {
    const { firstName, lastName, email, reason } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'First name, last name, and email are required' });
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Format current date for the email
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Calculate 30-day retention end date
    const retentionEndDate = new Date();
    retentionEndDate.setDate(retentionEndDate.getDate() + 30);
    const formattedRetentionEndDate = retentionEndDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@imagineyou-app.com',
      to: 'matthaiosmarkatis@gmail.com',
      subject: 'Account Deletion Request - Imagine You App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h1 style="color: #7B2CBF; border-bottom: 2px solid #C77DFF; padding-bottom: 10px;">Account Deletion Request</h1>
          
          <p><strong>Request Date:</strong> ${currentDate}</p>
          <p>A user has requested to delete their account with the following details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>First Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${firstName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Last Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            ${reason ? `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Reason for Deletion:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${reason}</td>
            </tr>
            ` : ''}
          </table>
          
          <div style="background-color: #f9f0ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #7B2CBF; margin-top: 0;">Deletion Protocol Reminder</h3>
            <p>According to our data retention policy:</p>
            <ul>
              <li>Immediate deletion required for: personal profile, AI-trained model, generated images, settings</li>
              <li>30-day retention (until ${formattedRetentionEndDate}) for: account identifiers and backup data</li>
              <li>Check if this user has an active Google Play subscription that needs to be handled</li>
            </ul>
            <p>Please process this request within 48 hours to comply with our privacy policy and Google Play requirements.</p>
          </div>
          
          <p style="font-size: 0.9em; color: #666; margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd;">
            This is an automated message from the Imagine You app account deletion system.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    return res.status(200).json({ message: 'Deletion request submitted successfully' });
  } catch (error: any) {
    console.error('Error sending deletion request:', error);
    return res.status(500).json({ 
      message: 'Failed to process deletion request',
      details: error?.message || 'Unknown error'
    });
  }
} 