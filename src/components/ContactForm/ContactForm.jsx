import PropTypes from 'prop-types';
import { Component } from "react";
import { nanoid } from "nanoid";
import { Button, Form } from "./ContactForm.styled";

const INITIAL_STATE = {
	name: '',
	number: '',
};

export default class AddContactForm extends Component {
	state = {...INITIAL_STATE	};

	handleSubmit = e => {
		e.preventDefault();
		// this.props.onSubmit({...this.state}); 
		const id = nanoid (6);
		const { name, number } = this.state;
    const { onAddContact } = this.props;
		this.reset();
		onAddContact({id, name, number});
	}

	reset() {
		this.setState({...INITIAL_STATE	})
	}

	contactNameId = nanoid()
	contactPhoneId = nanoid()

	handleChange = ({target}) => {	
		const {name, value} = target;

		this.setState({[name]: value});
	};

	render() {
		const {contactNameId, contactPhoneId, handleSubmit, handleChange} = this;
		const {number, name} =this.state;
		return (
			<Form onSubmit={handleSubmit}>
				<label htmlFor={contactNameId}>
					Name
					</label>
					<input
					id={contactNameId}
					type="text"
					name="name"
					required
					onChange={handleChange}
					value={name}
					pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
				/>
				
				<label htmlFor={contactPhoneId}>
					Number
					</label>
					<input 
					id={contactPhoneId}
					type="tel"
					name="number"
					required
					onChange={handleChange}
					value={number}
					pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[
						.\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
					title="Phone number must be
					digits and can contain spaces, dashes, parentheses and can start with +"
				/>
				
				<Button type='submit'>Add contact</Button>
			</Form>
		);
	}
	static propTypes = {
   onAddContact: PropTypes.func.isRequired,
  };
}

// AddContactForm.propTypes = {
// 	onAddContact: PropTypes.func,
// };