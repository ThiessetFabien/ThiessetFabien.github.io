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
        subject: data.subject,
        message: data.text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de l'envoi");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error);
    throw error;
  }
};
