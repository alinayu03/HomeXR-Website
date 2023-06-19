import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HomesContextProvider } from './context/HomeContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <HomesContextProvider>
        <App />
      </HomesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
