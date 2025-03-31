'use server'

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const submitContactForm = async (_state: any, formData: FormData) => {

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { error: 'All fields are required' };
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    });

    console.log('Email sent successfully');

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: 'Failed to send message. Please try again.' };
  }
};
