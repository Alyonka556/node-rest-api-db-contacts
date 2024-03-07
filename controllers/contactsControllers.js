import {
  addContact,
  getUpdateStatusContact,
  getContactsByFilter,
  getContactByFilter,
  updateContactByFilter,
  removeContactByFilter,
  getContactsCountByFilter,
} from "../services/contactsServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await getContactsByFilter({ owner }, { skip, limit });
  const total = await getContactsCountByFilter({ owner });
  res.status(200).json(total, result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await getContactByFilter({ _id: id, owner });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContactByFilter({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await addContact(...req.body, owner);

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateContactByFilter({ _id: id, owner }, req.body);

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;

  const result = await getUpdateStatusContact(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
