import nodemailer from "nodemailer";
import { env } from "../../../config/env.js";

export const sendMail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: env.mailHost,
    port: env.mailPort,
    secure: env.mailSecure,
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

