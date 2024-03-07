import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find({}, "-createdAt, updatedAt");

export const getContactsByFilter = (filter, query = {}) =>
  Contact.find(filter, "-createdAt, updatedAt", query);

export const getContactsCountByFilter = (filter) =>
  Contact.countDocuments(filter);
export const getContactById = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

export const getContactByFilter = (filter) => {
  return Contact.findOne(filter);
};

export const removeContact = (contactId) =>
  Contact.findByIdAndDelete(contactId);

export const removeContactByFilter = (filter) =>
  Contact.findOneAndDelete(filter);

export const addContact = (data) => Contact.create(data);

export const updateContactById = (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data, {
    new: true,
    runValidators: true,
  });

export const updateContactByFilter = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);

export const getUpdateStatusContact = async (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
