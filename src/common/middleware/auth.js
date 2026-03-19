import jwt from "jsonwebtoken";
import { env } from "../../../config/env.js";
import { User } from "../../database/model/user.model.js";

export const auth = async (req, res, next) => {
  try {
    let { token } = req.headers;
    let [bearer, realToken] = token.split(" ");

    if (bearer?.toLowerCase() !== "bearer") {
      return res.json({ message: "token format is invalid" });
    }

    let decoded = jwt.verify(realToken, env.jwtSecret);

    let user = await User.findById(decoded.id);
    console.log(user);
    req.user = user;

    next();
  } catch (err) {
    res.json({ message: "token is invalid" });
  }
};
