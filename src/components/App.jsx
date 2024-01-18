import { useState, useEffect } from "react"
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './App.css';

import AddContactForm from "./ContactForm/ContactForm";
// import Filter from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { nanoid } from "nanoid";
import Filter from "./Filter/Filter";

const phoneContacts = [
  { id: nanoid(6), name: 'Valerii', number: '+380 98 380 4 380'}
];

export const App = () => {
  // Значение извлекается из локального хранилища браузера с ключом 'contacts'
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? phoneContacts; //Если значение не найдено, устанавливается значение массива phoneContacts.
  });

  const [filter, setFilter] = useState('');

  // Срабатывает при изменении состояния contacts. Сохраняет текущие контакты в локальное хранилище браузера с ключом 'contacts'.
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Добавляет новый контакт в список контактов.
  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) =>
        name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );
    // Проверяет, существует ли контакт с таким же именем в списке контактов. Если контакт уже существует, выводится предупреждение.
    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...contact },
    ]);
  };

  //Изменяет значение фильтра.
  const changeFilter = event => {
    setFilter(event.target.value.trim());
  };

  // Получение отфильтрованных контактов.
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Удаление контакта из списка.
  const removeContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <section>
      <h1>Phonebook</h1>

      <AddContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        // Фильтр для отображения контактов.
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <p>Your phonebook is empty. Add first contact!</p>
      )}
      {contacts.length > 0 && (
        // Список контактов.
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </section>
  );
};

// export const App = () => {

//   const [contacts, setContacts] = useState(() => {
//     return JSON.parse(window.localStorage.getItem('contacts')) ?? phoneContacts;
//   });

//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     window.localStorage.setItem('contacts', JSON.stringify(contacts));
//   }, [contacts]);

//   const handleAddContact = data => {
//     const newContact = { id: nanoid(), ...data };
//     contacts.some(({ name }) => {
//       return name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase();
//     })
//       ? Notify.warning(`${newContact.name} is already in contacts`, {
//           width: '360px',
//           timeout: 5000,
//           fontSize: '20px',
//         })
//       : setContacts(({ contacts }) => {
//           return { contacts: [...contacts, newContact] };
//         });
//   };

//   const deleteContact = (id) => {
//     setContacts(({contacts}) => {
//       const newContact = contacts.filter(item => item.id !== id);

//       return {
//         contacts: newContact,
//       }
//     })
//   }

//   const changeFilter = ({target}) => {
//     console.log('target :>> ', target);
//     setFilter({
//       filter: target.value,
//     })
//   }

//   const getFilteredContact = () => {
//     // const {filter, contacts} = this.state;

//     const normalizedFilter = filter.toLowerCase();

//     const filteredContacts = contacts.filter(({name, number}) => { 
//       const normalizedName = name.toLowerCase();
//       const normalizedNumber = number.toLowerCase();

//       return (normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter))
//     })
//     return filteredContacts;
//   }
//   // const contacts = getFilteredContact();

//   return (
//     <section>
//       <h1>Phonebook</h1>
//       <AddContactForm onAddContact={handleAddContact} />
//       <h2>Contacts</h2>
//       <Filter onFilter={changeFilter} filter={filter}/>     
//       <ContactList contacts={getFilteredContact} deleteContact={deleteContact} />
//     </section>
//   );
//   }

  /*
export class App extends Component {
  state = {
    contacts: [{
      id: nanoid(6),
      name: 'Valerii',
      number: '+380 98 380 4 380'
    },
  ],
    filter: '',
  }

  componentDidMount() {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      this.setState({ contacts: storedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    // console.log('prevState :>> ', prevState);
    // console.log('this.state :>> ', this.state);
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    if (prevState.contacts.length > this.state.contacts.length) {
     console.log('delited :>> ', "delited");
    }
     if (prevState.contacts.length < this.state.contacts.length) {
    }
  }


  handleAddContact = data => {
    const newContact = { id: nanoid(), ...data };
    this.state.contacts.some(({ name }) => {
      return name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase();
    })
      ? Notify.warning(`${newContact.name} is already in contacts`, {
          width: '360px',
          timeout: 5000,
          fontSize: '20px',
        })
      : this.setState(({ contacts }) => {
          return { contacts: [...contacts, newContact] };
        });
  };

  deleteContact = (id) => {
    this.setState(({contacts}) => {
      const newContact = contacts.filter(item => item.id !== id);

      return {
        contacts: newContact,
      }
    })
  }

  changeFilter = ({target}) => {
    console.log('target :>> ', target);
    this.setState({
      filter: target.value,
    })
  }

  getFilteredContact() {
    const {filter, contacts} = this.state;

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({name, number}) => { 
      const normalizedName = name.toLowerCase();
      const normalizedNumber = number.toLowerCase();

      return (normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter))
    })
    return filteredContacts;
  }
  
  render() {    
    const {handleAddContact} = this;
    const contacts = this.getFilteredContact();

    return (
    <section>
      <h1>Phonebook</h1>
      <AddContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter onFilter={this.changeFilter} filter={this.state.filter}/>     
      <ContactList contacts={contacts} deleteContact={this.deleteContact} />
    </section>
  );}
};
*/