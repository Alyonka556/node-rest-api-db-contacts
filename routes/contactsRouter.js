import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";

import isValidId from "../middelwares/isValidId.js";

import {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post(
  "/",
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
