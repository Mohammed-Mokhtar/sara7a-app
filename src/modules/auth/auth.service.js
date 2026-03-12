import { User } from "../../database/model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const hashedPassword = await bcrypt.hash(password, 10);

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  let image = "";
  if (req.file) image = `${baseUrl}/uploads/${req.file.filename}`;
  console.log(image);

  const addedUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    shareProfileName,
    image,
  });

  res.json({ message: "user added", addedUser });
};

export const loginService = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) return res.json({ message: "body is wrong" });

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "email or password or wrong" });
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword)
    return res.json({ message: "email or password or wrong" });

  const refreshToken = jwt.sign({ id: user._id }, "bearer", {
    expiresIn: "1y",
  });

  const accessToken = jwt.sign({ id: user._id }, "bearer", {
    expiresIn: "30m",
  });

  res.json({
    message: "user logged in successfully",
    refreshToken,
    accessToken,
  });
};

export const generateAccessToken = (req, res) => {
  const user = req.user;
  console.log(user);
  const accessToken = jwt.sign({ id: user._Id }, "bearer", {
    expiresIn: "30m",
  });
  return res.json({ accessToken });
};
