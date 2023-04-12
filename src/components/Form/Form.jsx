import { useState } from 'react';
import { Input, Button, Form, Label } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContactsItems } from 'redux/selectors';

export default function ContactsForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsItems);

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name': {
        setName(value);
        break;
      }
      case 'number': {
        setPhone(value);
        break;
      }

      default:
        return;
    }
  };

  const handleSumbit = event => {
    event.preventDefault();
    const normalizateName = name.toLocaleLowerCase();
    const findName = contacts.filter(
      contact => contact.name.toLocaleLowerCase() === normalizateName
    );
    if (findName.length !== 0) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact({name, phone}));
    }
    reset();
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <Form onSubmit={handleSumbit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInputChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleInputChange}
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}
