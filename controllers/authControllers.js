import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  const { email } = req.body;
  const newUser = await authServices.signUp(req.body);
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const newUser = await authServices.signIn(req.body);
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await authServices.setToken(user._id, token);
  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await authServices.setToken(_id);

  res.json({
    message: "No Content",
  });
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};
