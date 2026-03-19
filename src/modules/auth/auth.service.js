import { User } from "../../database/model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../../config/env.js";
import { sendMail } from "../../common/email/sendEmail.js";

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const signupService = async (req, res) => {
  let { name, shareProfileName, email, password, confirmPassword, role } =
    req.body;

  console.log(req.body);

  if (!name || !email || !password || !confirmPassword)
    return res.json({ message: "body is wrong" });

  const user = await User.findOne({ email });
  if (user) return res.json({ message: "email already exist" });
  if (password != confirmPassword)
    return res.json({ message: "password not match" });
  const hashedPassword = await bcrypt.hash(password, env.bcryptSaltRounds);

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  let image = "";
  if (req.file) image = `${baseUrl}/uploads/${req.file.filename}`;

  const otp = generateRandomNumber(100000, 999999);

  await sendMail(email, "Verify your account", `Your OTP is: ${otp}`);

  const addedUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    shareProfileName,
    otp,
    isVerified: false,
    image,
  });

  res.json({ message: "user added please verify account", addedUser });
};

export const loginService = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) return res.json({ message: "body is wrong" });

  const user = await User.findOne({ email });

  if (!user) return res.json({ message: "email or password or wrong" });
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword)
    return res.json({ message: "email or password or wrong" });

  if (!user.isVerified)
    return res.json({
      message: "this user is not verified please verify first and try again",
    });

  const refreshToken = jwt.sign({ id: user._id }, env.jwtSecret, {
    expiresIn: env.refreshTokenExpiresIn,
  });

  const accessToken = jwt.sign({ id: user._id }, env.jwtSecret, {
    expiresIn: env.accessTokenExpiresIn,
  });

  res.json({
    message: "user logged in successfully",
    refreshToken,
    accessToken,
  });
};

export const verifyAccount = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "this user is not exist" });

  if (user.isVerified) return res.json({ message: "you already verified" });

  if (otp != user.otp) return res.json({ message: "this otp is wrong" });

  user.isVerified = true;

  await user.save();

  return res.json({ message: "user verified successfully" });
};

export const forgetPassword = async (req, res) => {
  let { email } = req.body;

  const existedEmail = await User.findOne({ email });
  if (!existedEmail) return res.json({ message: "email not found" });

  let otp = generateRandomNumber(100000, 999999);

  existedEmail.otp = otp;

  await existedEmail.save();

  await sendMail(email, "reset password", `your otp is ${otp}`);
  res.json({ message: "otp sent" });
};

export const resetPassword = async (req, res) => {
  let { email, newPassword, confirmPassword, otp } = req.body;

  if (newPassword != confirmPassword)
    return res.json({ message: "password doesn't match confirmPassword" });

  const existedEmail = await User.findOne({ email });

  if (!existedEmail) return res.json({ message: "this email is not found" });

  if (existedEmail.otp != otp)
    return res.json({ message: "this otp is wrong" });

  existedEmail.password = await bcrypt.hash(newPassword, env.bcryptSaltRounds);
  existedEmail.otp = null;

  await existedEmail.save();

  res.json({ message: "password reset successfully" });
};

export const generateAccessToken = (req, res) => {
  const user = req.user;
  console.log(user);
  const accessToken = jwt.sign({ id: user._id }, env.jwtSecret, {
    expiresIn: env.accessTokenExpiresIn,
  });
  return res.json({ accessToken });
};
