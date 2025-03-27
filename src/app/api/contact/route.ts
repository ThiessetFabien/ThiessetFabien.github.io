import type { NextRequest as Request } from 'next/server';
import { NextResponse } from 'next/server';

import { gmail } from '@/src/config/gmailAuth.config';
import { checkGmailAuth } from '@/src/middlewares/gmailAuth.middleware';
import { ContactFormSchema } from '@/src/schemas/contactForm.schema';
import { SanitizationService } from '@/src/services/sanitize.service';

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

    const validatedData = ContactFormSchema.parse(body);

    const sanitzeInput = SanitizationService.getInstance().sanitizeInput;

    const sanitizedData = {
      email: sanitzeInput(validatedData.email),
      type: sanitzeInput(validatedData.type),
      name: sanitzeInput(validatedData.name),
      message: sanitzeInput(validatedData.message),
    };

    if (Object.values(sanitizedData).some((value) => !value)) {
      return NextResponse.json(
        { success: false, error: 'Invalid data' },
        { status: 400 }
      );
    }

    const utf8Subject = `=?utf-8?B?${Buffer.from(
      `Nouveau message de ${sanitizedData.name} - ${sanitizedData.type}`
    ).toString('base64')}?=`;

    const messageParts = [
      `From: ${sanitizedData.email}`,
      `To: ${process.env.SMTP_SERVER_USERNAME}`,
      `Content-Type: text/html; charset=utf-8`,
      `MIME-Version: 1.0`,
      `Subject: ${utf8Subject}`,
      '',
      `<h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${sanitizedData.name}</p>
      <p><strong>Email:</strong> ${sanitizedData.email}</p>
      <p><strong>Type:</strong> ${sanitizedData.type}</p>
      <p><strong>Message:</strong></p>
      <p>${sanitizedData.message}</p>`,
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
