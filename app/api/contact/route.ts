import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
  SMTP_SERVER_SERVICE,
  SMTP_SERVER_USERNAME,
} from '@/services/ENV_VARS';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
  scope: 'https://mail.google.com/',
});

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
      return NextResponse.json(
        { error: 'Missing environment variables' },
        { status: 500 }
      );
    }

    const { email, subject, text, sendTo } = await request.json();

    if (!email || !subject || !text || !sendTo) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { token: accessToken } = await oAuth2Client.getAccessToken();

    if (!accessToken) {
      return new Error('Failed to get access token');
    }

    const transporter = nodemailer.createTransport({
      service: SMTP_SERVER_SERVICE,
      auth: {
        type: 'OAuth2',
        user: SMTP_SERVER_USERNAME,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: email,
      to: SMTP_SERVER_USERNAME,
      subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Error sending email:', error);

    return NextResponse.json(
      { error: 'Failed to send mail', details: error.message },
      { status: 500 }
    );
  }
}
