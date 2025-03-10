import { createTransport } from 'nodemailer';

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    const transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.SMTP_SERVER_USERNAME,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: data.email,
      to: process.env.SMTP_SERVER_USERNAME,
      subject: `Message portfolio de ${data.name}`,
      text: data.message,
      html: `<p>Nom: ${data.name}</p><p>Email: ${data.email}</p><p>Message: ${data.message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email envoyé avec succès' }),
    };
  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erreur lors de l'envoi de l'email",
        error: error.message,
      }),
    };
  }
}
