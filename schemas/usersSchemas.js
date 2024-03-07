import Joi from "joi";

import { emailRegexp } from "../constants/regexp.js";

export const signUpSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be longer than 6 symbols",
    "any.required": "Password must be longer than 6 symbols",
  }),
  email: Joi.string().email().pattern(emailRegexp).required().messages({
    "string.email": "Email must be a valid address",
    "any.required": "Email is required",
  }),
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    "any.only": "Subscription has only 3 values: starter, pro, business",
  }),
});

export const signInSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": "Enter password",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Enter email",
  }),
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    "any.only": "Subscription has only 3 values: starter, pro, business",
  }),
});
