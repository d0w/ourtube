import React from 'react';
import ReactDOM from 'react-dom/client';
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';
import App from './App';
import axios from 'axios';
import { PersistGate } from 'redux-persist/lib/integration/react.js';


axios.defaults.baseURL = '/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>

  </React.StrictMode>
);
