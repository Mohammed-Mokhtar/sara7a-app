import joi from "joi";

export const updateUserSchema = joi.object({
  name: joi.string().trim().min(2).max(50).optional(),
  shareProfileName: joi.string().trim().min(3).max(30).optional(),
  image: joi.string().trim().optional(),
});
