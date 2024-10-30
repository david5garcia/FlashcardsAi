import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendEmail(
  email: string,
  subject: string,
  text: string,
  html: string
) {
  await transporter.sendMail({
    from: `"FlashcardsAi" <${process.env.EMAIL}>`,
    to: email,
    subject: subject,
    text: text,
    html: html
  });
}

export const emailService = {
  sendEmail
};
