import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks';
import Routes from './routes';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
      {/* <ToastContainer autoClose={3000} /> */}
    </Router>
  );
}

export default App;
