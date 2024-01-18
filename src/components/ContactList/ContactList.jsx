import { List } from "./ContactList.styled";
import PropTypes from 'prop-types';


export const ContactList =(({contacts, onRemoveContact}) => {
	const elements = contacts.map(({id, name, number}) => <li key={id}>{name}: {number} <button onClick={() => onRemoveContact(id)} type="button">Delete</button></li>)
	return (
		<List>
			{elements}
		</List>
	)});

	ContactList.propTypes = {
		contacts: PropTypes.array.isRequired,
		onRemoveContact: PropTypes.func.isRequired
	};
	