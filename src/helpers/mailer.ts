import nodemailer from 'nodemailer';
import User from '@/models/user-model';
import bcrypt from 'bcrypt';

export const sendEmail = async ({email, emailType, userId}: {email: string, emailType: string, userId: string}) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    let user;

    if (emailType === 'RESET_PASSWORD') {
      user = await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpireDate: Date.now() + 3600000,
      });
    } else if (emailType === 'VERIFY') {
      user = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpireDate: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_AUTH_USER,
        pass: process.env.MAILTRAP_AUTH_PASS,
      }
    });

    const mailOptions = {
      from: '',
      to: email,
      subject: emailType === 'RESET_PASSWORD' ? 'Reset Password' : 'Verify Email',
      html: `<p>Click <a href="${process.env.APP_HOST}/verification?token=${hashedToken}">here</a> 
      to ${emailType === 'RESET_PASSWORD' ? "verify your email" : "reset your password"} 
      or copy and paste the link below in your browser. <br> ${process.env.APP_HOST}/verification?token=${hashedToken}</p>`
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.error('Error sending email:', error);
  }
};
