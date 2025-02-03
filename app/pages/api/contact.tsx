import type { NextApiRequest, NextApiResponse } from 'next';

import { sendEmail } from '@/services/sendEmail';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, email, message, type, consent } = req.body;
      const phone = parseInt(req.body.phone);

      await sendEmail({ name, email, message, phone, type, consent });
      res
        .status(200)
        .json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
