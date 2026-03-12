import { User } from "../../database/model/user.model.js";

export const getProfileService = async (req, res) => {
  const user = req.user;
  return res.json({ message: "user found", user });
};

export const deleteProfileService = async (req, res) => {
  const user = req.user;
  const deletedUser = await User.findByIdAndDelete(user._id);
  if (!deletedUser) return res.json({ message: "user not exist" });

  return res.json({ message: "user found and deleted", deletedUser });
};

export const updateProfileService = async (req, res) => {
  let { name } = req.body;
  const user = req.user;
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { name },
    { new: true },
  );
  if (!updatedUser) return res.json({ message: "user not exist" });

  return res.json({ message: "user found and updated", updatedUser });
};

export const getProfileUrlService = async (req, res) => {
  const user = req.user;
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  return res.json({
    message: "success",
    url: `${baseUrl}/api/v1/users/${user.shareProfileName}`,
  });
};

export const getProfileByUrlService = async (req, res) => {
  const { url } = req.body;
  const profileName = url.split(`/`).at(-1);
  const user = await User.findOne({ shareProfileName: profileName });
  return res.json({ message: "success", user });
};
