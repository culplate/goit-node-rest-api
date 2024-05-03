import contactsService from "../services/contactsServices.js";
import fs from "node:fs/promises";
import { nanoid } from "nanoid";
import path from "node:path";

const contactsPath = path.join(
  path.dirname("contactsControllers.js"),
  "db/contacts.json"
);

export async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);

  if (contactIdx === -1) return null;

  const deletedContact = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}