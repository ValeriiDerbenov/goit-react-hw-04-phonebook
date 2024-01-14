import { List } from "./ContactList.styled";
import PropTypes from 'prop-types';


export const ContactList =(({contacts, deleteContact}) => {
	const elements = contacts.map(({id, name, number}) => <li key={id}>{name}: {number} <button onClick={() => deleteContact(id)} type="button">Delete</button></li>)
	return (
		<List>
			{elements}
		</List>
	)});

	ContactList.propTypes = {
		contacts: PropTypes.array.isRequired,
		deleteContact: PropTypes.func.isRequired,
	};
	