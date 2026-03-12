import joi from "joi";

export const signupSchema = joi.object({
  name: joi.string().trim().min(2).max(50).required(),
  email: joi.string().trim().email().required(),
  password: joi.string().min(6).max(30).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
  shareProfileName: joi.string().trim().min(3).max(30).required(),
  role: joi.string().valid("admin", "user").default("user").optional(),
});

export const loginSchema = joi.object({
  email: joi.string().trim().email().required(),
  password: joi.string().required(),
});
