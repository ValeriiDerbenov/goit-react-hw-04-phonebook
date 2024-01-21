import { useState, useEffect } from "react"
import './App.css';

import AddContactForm from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { nanoid } from "nanoid";
import Filter from "./Filter/Filter";

const phoneContacts = [
  { id: nanoid(6), name: 'Valerii', number: '+380 98 380 4 380'}
];

export const App = () => {
    const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? phoneContacts; 
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) =>
        name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );
   
    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...contact },
    ]);
  };

  const changeFilter = event => setFilter(event.target.value.trim());

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const removeContact = contactId => setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId));

  const visibleContacts = getVisibleContacts();

  return (
    <section>
      <h1>Phonebook</h1>
      <AddContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 0 ? (<Filter value={filter} onChangeFilter={changeFilter} />) : (<p>Your phonebook is empty. Add first contact!</p>)}
      {contacts.length > 0 && (
          <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </section>
  );
};
