import type { NextRequest as Request } from 'next/server';
import { NextResponse } from 'next/server';

import { gmail } from '@src/config/gmailAuth.config';
import { checkGmailAuth } from '@src/middlewares/gmailAuth.middleware';
import { ContactFormSchema } from '@src/schemas/contactForm.schema';

export const config = {
  runtime: 'edge',
};

export async function POST(request: Request) {
  try {
    const authCheck = await checkGmailAuth();

    if (authCheck.status !== 200) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // La validation avec Zod assure déjà un niveau de sécurité
    const validatedData = ContactFormSchema.parse(body);

    if (
      !validatedData.email ||
      !validatedData.type ||
      !validatedData.name ||
      !validatedData.message
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid data' },
        { status: 400 }
      );
    }

    const utf8Subject = `=?utf-8?B?${Buffer.from(
      `Nouveau message de ${validatedData.name} - ${validatedData.type}`
    ).toString('base64')}?=`;

    const messageParts = [
      `From: ${validatedData.email}`,
      `To: ${process.env.SMTP_SERVER_USERNAME}`,
      `Content-Type: text/html; charset=utf-8`,
      `MIME-Version: 1.0`,
      `Subject: ${utf8Subject}`,
      '',
      `<h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${validatedData.name}</p>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      <p><strong>Type:</strong> ${validatedData.type}</p>
      <p><strong>Message:</strong></p>
      <p>${validatedData.message.replace(/\n/g, '<br>')}</p>`,
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
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
