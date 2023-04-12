
import { List, Button, Container, Item } from './ContactsList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getVisibleContacts } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContacts, deleteContact } from 'redux/operations';

const ContactsList = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getContacts);
  const visibleContacts = useSelector(getVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading === true && <h2>Loading...</h2>}
      {error && <h2>Error!: {error}</h2>}
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

// ContactsList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.exact({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string,
//     })
//   ),
// };
