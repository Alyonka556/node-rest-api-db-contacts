import express from "express";

import authController from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";
import authtenticate from "../middelwares/authtenticate.js";

import { signUpSchema, signInSchema } from "../schemas/usersSchemas.js";

import upload from "../middelwares/upload.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(signUpSchema), authController.signUp);

authRouter.post("/signin", validateBody(signInSchema), authController.signIn);

authRouter.get("/current", authtenticate);

authRouter.post("/signout", authtenticate, authController.signout);

authRouter.patch(
  "/users/avatars",
  upload.single("photo"),
  authtenticate,
  authController.updateAvatar
);

export default authRouter;
