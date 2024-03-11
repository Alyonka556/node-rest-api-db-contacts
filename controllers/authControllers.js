import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import gravatar from "gravatar";
import jimp from "jimp";
import fs from "fs/promises";
import path from "path";

import * as authServices from "../services/authServices.js";
import * as userServices from "../services/userServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const contactsDir = path.resolve("public", "avatars");

const signUp = async (req, res) => {
  const { email } = req.body;

  const user = await userServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const gravatarPath = gravatar.url(email);

  const newUser = await authServices.signUp({ ...req.body, gravatarPath });
  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  // const newUser = await authServices.signIn(req.body);
  const user = await userServices.findUser({ email });
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
    user: {
      email: user.email,
      subscription: user.subscription,
    },
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

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(contactsDir, filename);

  await fs.rename(oldPath, newPath);

  await jimp.read(newPath).resize(250, 250).writeAsync(newPath);

  const avatarURL = path.join(contactsDir, filename);
  const newUser = await userServices.updateAvatar(_id, avatarURL);

  res.json({ photo: newUser.avatarURL });
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
