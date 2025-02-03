import nodemailer from 'nodemailer';
import { z } from 'zod';

import type { formSchema } from '@/schemas/mailSchema';

type FormData = z.infer<typeof formSchema>;

export const sendEmail = async (data: FormData) => {
  const transporter = nodemailer.createTransport({
    service: process.env.CONTACT_SERVICE,
    auth: {
      user: process.env.CONTACT_USER,
      pass: process.env.CONTACT_PASS,
    },
  });

  const mailOptions = {
    from: data.email,
    to: process.env.CONTACT_USER,
    subject: `[${data.type}] - Contact From Portfolio`,
    text: `Type: ${data.type}\nName: ${data.name}\nPhone: ${data.phone}\nMessage: ${data.message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
