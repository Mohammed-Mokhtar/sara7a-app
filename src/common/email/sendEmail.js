import nodemailer from "nodemailer";
import { env } from "../../../config/env.js";

export const sendMail = async (email, subject, text) => {
  assertMailConfig();

  const transporter = nodemailer.createTransport({
    host: smtp.gmail.com,
    port: 587,
    secure: false,
    auth: {
      user: env.mailUser,
      pass: env.mailPass,
    },
  });

  const info = await transporter.sendMail({
    from: env.mailFrom,
    to: email,
    subject,
    text,
  });

  console.log("Message sent:", info.messageId);
};

