import nodemailer from 'nodemailer';

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn('SMTP credentials are not fully configured in environment variables.');
    console.log(`Sending Mock Email to ${to}:\nSubject: ${subject}\n[Body content omitted in logs for privacy]`);
    return { mockSent: true };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // True only for SSL port 465
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `"Honworth Inquiries" <${user}>`,
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
}
