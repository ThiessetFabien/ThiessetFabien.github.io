const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Utilisez le service de votre choix
    auth: {
      user: 'your-email@gmail.com', // Remplacez par votre email
      pass: 'your-email-password', // Remplacez par votre mot de passe
    },
  });

  let mailOptions = {
    from: 'your-email@gmail.com', // Remplacez par votre email
    to: 'recipient-email@example.com', // Remplacez par l'email du destinataire
    subject: 'Contact Form Submission',
    text: `Type: ${data.type}\nName: ${data.name}\nPhone: ${data.phone}\nMessage: ${data.message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
