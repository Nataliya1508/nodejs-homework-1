const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db/contacts.json");


const listContacts = async () => {
   
        const data = await fs.readFile(contactsPath, "utf-8");

        return JSON.parse(data);
   
    }

    const getContactById = async (id) => {
        
            const contacts = await listContacts();
            const result = contacts.find(item => item.id === id);

            return result || null;
        
    }
    const removeContact = async (contactId) => {
        const contacts = await listContacts();
        const index = contacts.filter(({ id }) => id !== contactId);

        if (index === -1) {
            return null;
        }
        const result = contacts.filter(({ id }) => id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(result), "utf8");
        
        return result;
    }


    const addContact = async (name, email, phone) => {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        }
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));

        return newContact;
    
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};