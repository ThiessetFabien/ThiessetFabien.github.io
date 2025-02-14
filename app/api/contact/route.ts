import { NextResponse } from 'next/server';
import type { NextRequest as Request } from 'next/server';

import { gmail } from '@config/gmailAuth';
import { checkGmailAuth } from '@middleware/checkGmailAuth';

export async function POST(req: Request) {
  try {
    const authCheck = await checkGmailAuth(req);
    if (authCheck.status !== 200) {
      return authCheck;
    }

    const { name, email, message, type } = await req.json();

    const utf8Subject = `=?utf-8?B?${Buffer.from(
      `Nouveau message de ${name} - ${type}`
    ).toString('base64')}?=`;

    const messageParts = [
      `From: ${email}`,
      `To: ${process.env.SMTP_SERVER_USERNAME}`,
      `Content-Type: text/html; charset=utf-8`,
      `MIME-Version: 1.0`,
      `Subject: ${utf8Subject}`,
      '',
      `<h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>`,
    ];

    const messageRaw = messageParts.join('\n');

    const encodedMessage = Buffer.from(messageRaw)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
