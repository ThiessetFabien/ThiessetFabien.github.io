'use server';
import nodemailer from 'nodemailer';
import { getOAuthToken } from './generateToken';

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVER_SERVICE,
  host: process.env.SMTP_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.SMTP_SERVER_USERNAME,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: await getOAuthToken(),
  },
});

export const sendEmail = async ({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string;
  sendTo: string;
  subject: string;
  text: string;
  html?: string;
}) => {
  try {
    await transporter.verify();
  } catch (error) {
    console.error(
      'Something went wrong',
      process.env.SMTP_SERVER_USERNAME,
      process.env.SMTP_SERVER_SERVICE,
      error
    );

    const info = await transporter.sendMail({
      from: email,
      to: process.env.SITE_MAIL_RECIEVER,
      subject,
      text,
      html: html ? html : '',
    });

    console.log('Message sent: ', info.messageId);
    console.log('Mail sent to: ', sendTo);
    return info;
  }
};
