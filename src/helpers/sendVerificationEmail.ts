import { transporter } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';
import { render } from '@react-email/render';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    console.log(`📧 Attempting to send verification email to: ${email}`);
    
    // Render React component to HTML
    const emailHtml = render(
      VerificationEmail({ username, otp: verifyCode })
    );

    // Send email using Nodemailer
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@anonymsmessage.com',
      to: email,
      subject: 'Anonyms Message - Verification Code',
      html: emailHtml,
    });

    console.log(`✅ Email sent successfully to ${email}, ID: ${info.messageId}`);
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('❌ Error sending verification email:', emailError);
    return { success: false, message: `Failed to send verification email: ${emailError}` };
  }
}
