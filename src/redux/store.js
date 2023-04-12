import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from './contactsSlice';
import { filterSlice } from './filterSlice';




// const persistedReducerContacts = persistReducer(
//   persistConfig,
//   contactsSlice.reducer
// );

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  },
});

// export const persistor = persistStore(store);
