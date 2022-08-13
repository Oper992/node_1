const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);

    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();

    const result = allContacts.find((item) => item.id === contactId);

    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    const removedContact = contacts.find((contact) => contact.id === contactId);

    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return removedContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
