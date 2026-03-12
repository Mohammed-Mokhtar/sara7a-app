import jwt from "jsonwebtoken";
import { User } from "../../database/model/user.model.js";

export const auth = async (req, res, next) => {
  try {
    let { token } = req.headers;
    let [bearer, realToken] = token.split(" ");

    let decoded = jwt.verify(realToken, bearer);

    let user = await User.findById(decoded.id);
    console.log(user);
    req.user = user;

    next();
  } catch (err) {
    res.json({ message: "token is invalid" });
  }
};
