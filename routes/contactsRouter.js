import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";

import isValidId from "../middelwares/isValidId.js";
import authtenticate from "../middelwares/authtenticate.js";
import upload from "../middelwares/upload.js";

import {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authtenticate);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  upload.single("photo"),
  validateBody(addSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsControllers.updateStatusContact
);

export default contactsRouter;
