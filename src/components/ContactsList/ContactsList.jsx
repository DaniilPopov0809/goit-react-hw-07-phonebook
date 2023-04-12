
import { List, Button, Container, Item } from './ContactsList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectFilter, selectVisibleContacts } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContacts, deleteContact } from 'redux/operations';

const ContactsList = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(selectContacts);
  const visibleContacts = useSelector(selectVisibleContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
 
  return (
    <>
      {isLoading === true && <h2>Loading...</h2>}
      {error && <h2>Error!: {error}</h2>}
      {items.length === 0 && visibleContacts.length === 0 && !error && <h3>No contacts!</h3>}
      {items.length !== 0 && visibleContacts.length === 0 && !error && <h3>Contacts '{filter}' not found!</h3>} 
      <List>
        {visibleContacts.map(({ id, name, phone }) => (
          <Item key={id}>
            <Container>
              {name}: {phone}
            </Container>
            <Button type="button" onClick={() => dispatch(deleteContact(id))}>
              Delete
            </Button>
          </Item>
        ))}
      </List>
    </>
  );
};

export default ContactsList;

