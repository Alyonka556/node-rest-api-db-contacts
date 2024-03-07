import express from "express";

import authController from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";
import authtenticate from "../middelwares/authtenticate.js";

import { signUpSchema, signInSchema } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(signUpSchema), authController.signUp);

authRouter.post("/signin", validateBody(signInSchema), authController.signUp);

authRouter.get("/current", authtenticate);

authRouter.post("/signout", authtenticate, authController.signout);
export default authRouter;
