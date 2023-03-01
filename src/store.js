import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {},
  middleware: [thunk]
});

setupListeners(store.dispatch);

export default store;
