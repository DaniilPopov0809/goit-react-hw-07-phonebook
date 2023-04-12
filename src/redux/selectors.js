import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts;
export const selectContactsItems = state => state.contacts.items;
export const selectFilter = state => state.filter;

export const selectVisibleContacts = createSelector(
  [selectContactsItems, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  }
);
