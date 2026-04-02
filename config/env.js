import dotenv from "dotenv";

dotenv.config({ path: "./config/.env", quiet: true });

export const env = {
  isVercel: Boolean(process.env.VERCEL),
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
  // || "mongodb://localhost:27017/Nti_sara7a",\
  uploadsDir: process.env.VERCEL ? "/tmp/uploads" : "uploads",
  jwtSecret: process.env.JWT_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
  mailFrom: process.env.MAIL_FROM,
};

