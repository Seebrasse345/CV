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

  console.log('[API Route] Deletion request received');
  
  try {
    // Check if all environment variables are set
    const envVars = {
      EMAIL_SERVER: process.env.EMAIL_SERVER || 'smtp.gmail.com',
      EMAIL_PORT: process.env.EMAIL_PORT || '587',
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? '******' : undefined,
      EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@imagineyou-app.com'
    };
    
    console.log('[API Route] Environment variables check:', {
      EMAIL_SERVER: envVars.EMAIL_SERVER,
      EMAIL_PORT: envVars.EMAIL_PORT,
      EMAIL_USER: envVars.EMAIL_USER ? '***@gmail.com' : undefined,
      EMAIL_PASSWORD: envVars.EMAIL_PASSWORD ? 'Set' : 'Not set',
      EMAIL_FROM: envVars.EMAIL_FROM
    });
    
    if (!envVars.EMAIL_USER || !envVars.EMAIL_PASSWORD) {
      console.error('[API Route] Missing required email configuration');
      return res.status(500).json({ 
        message: 'Server configuration error',
        details: 'Email credentials are not properly configured'
      });
    }

    const { firstName, lastName, email, reason } = req.body;
    console.log('[API Route] Form data received:', { firstName, lastName, email, reasonProvided: !!reason });

    // Validate required fields
    if (!firstName || !lastName || !email) {
      console.log('[API Route] Missing required fields');
      return res.status(400).json({ message: 'First name, last name, and email are required' });
    }

    // Configure email transporter
    console.log('[API Route] Configuring email transporter');
    const transporter = nodemailer.createTransport({
      host: envVars.EMAIL_SERVER,
      port: parseInt(envVars.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: envVars.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify transporter configuration
    try {
      console.log('[API Route] Verifying email configuration');
      await transporter.verify();
      console.log('[API Route] Email configuration verified successfully');
    } catch (verifyError: any) {
      console.error('[API Route] Email verification failed:', verifyError);
      return res.status(500).json({
        message: 'Failed to connect to email server',
        details: verifyError.message
      });
    }

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
      from: envVars.EMAIL_FROM,
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
    console.log('[API Route] Attempting to send email to:', mailOptions.to);
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('[API Route] Email sent successfully. Message ID:', info.messageId);
    } catch (emailError: any) {
      console.error('[API Route] Error sending email:', emailError);
      return res.status(500).json({
        message: 'Failed to send email notification',
        details: emailError.message
      });
    }

    // Return success response
    console.log('[API Route] Deletion request processed successfully');
    return res.status(200).json({ message: 'Deletion request submitted successfully' });
  } catch (error: any) {
    console.error('[API Route] Unhandled error:', error);
    return res.status(500).json({ 
      message: 'Failed to process deletion request',
      details: error?.message || 'Unknown error'
    });
  }
} 