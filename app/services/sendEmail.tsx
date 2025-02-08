import { SMTP_SERVER_USERNAME } from './ENV_VARS';
import type { EmailData } from '@/types/data/EmailDataProps';

export const sendEmail = async (
  data: EmailData
): Promise<{ success: boolean; messageId?: string }> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        to: SMTP_SERVER_USERNAME,
        subject: data.subject,
        message: data.text,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
