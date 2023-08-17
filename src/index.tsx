import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import LandingPage from './screens/LandingPage';
import HomePage from './screens/HomePage';
import Header from './models/header/Header.js'
import firebase from './firebase.js'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Header/>
    <HomePage/>
  
  </React.StrictMode>
);

