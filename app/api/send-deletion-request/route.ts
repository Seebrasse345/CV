import { NextResponse } from 'next/server';

// Export runtime configuration for Vercel (keep for now)
export const runtime = 'nodejs';

export async function POST(request: Request) {
  console.log('[Vercel Debug] /api/send-deletion-request HIT!'); // Add specific log

  try {
    // Try parsing body just to see if request arrives
    const body = await request.text(); // Use text() instead of json() for simplicity
    console.log('[Vercel Debug] Request Body Received (as text):', body.substring(0, 100)); // Log first 100 chars

    // Return a simple success response
    return NextResponse.json({ message: 'API route reached successfully (Debug Mode)' }, { status: 200 });

  } catch (error: any) {
    console.error('[Vercel Debug] Error in simplified route:', error);
    return NextResponse.json({ 
        message: 'Error in simplified API route', 
        details: error?.message 
    }, { status: 500 });
  }
}

/* 
// Original code commented out for debugging:

import nodemailer from 'nodemailer';

// Helper function to check if environment variables are set
function checkEnvVars() {
  const requiredVars = ['EMAIL_USER', 'EMAIL_PASSWORD'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  console.log('Account deletion request received');
  
  // Validate environment variables first
  if (!checkEnvVars()) {
    return NextResponse.json({
      message: 'Server configuration error. Please contact support.',
      details: 'Missing email configuration'
    }, { status: 500 });
  }
  
  try {
    // Parse the request body
    let requestBody;
    try {
      requestBody = await request.json();
      console.log('Request body parsed successfully:', requestBody);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { message: 'Invalid request format: Could not parse JSON body' },
        { status: 400 }
      );
    }
    
    const { firstName, lastName, email, reason } = requestBody;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      console.error('Missing required fields:', { firstName, lastName, email });
      return NextResponse.json(
        { message: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    // Configure email transporter
    console.log('Configuring email transporter');
    const transportConfig = {
      host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
    
    console.log('Email configuration:', {
      host: transportConfig.host,
      port: transportConfig.port,
      secure: transportConfig.secure,
      user: transportConfig.auth.user ? '***@gmail.com' : 'undefined', // Log only masked email for security
      passwordProvided: !!transportConfig.auth.pass
    });
    
    const transporter = nodemailer.createTransport(transportConfig);

    // Test SMTP connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified');
    } catch (verifyError: any) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json({
        message: 'Email server connection failed',
        details: verifyError.message
      }, { status: 500 });
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
    console.log('Attempting to send email to:', mailOptions.to);
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
    } catch (emailError: any) {
      console.error('Error sending email:', emailError);
      // Provide more detailed error for troubleshooting
      return NextResponse.json({
        message: 'Failed to send email notification',
        details: emailError.message
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Deletion request submitted successfully' 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Unhandled error in deletion request handler:', error);
    return NextResponse.json({
      message: 'Failed to process deletion request',
      details: error?.message || 'Unknown error'
    }, { status: 500 });
  }
} 
*/ 