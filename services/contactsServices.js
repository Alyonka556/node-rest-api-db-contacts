import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();

export const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

export const removeContact = async (contactId) =>
  Contact.findByIdAndDelete(contactId);

export const addContact = async (data) => Contact.create(data);

export const updateContactById = async (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data, {
    new: true,
    runValidators: true,
  });

export const getUpdateStatusContact = async (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
