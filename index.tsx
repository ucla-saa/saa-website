import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import LandingPage from './src/screens/LandingPage';
import HomePage from './src/screens/HomePage';
import Header from './src/models/header/Header.js'
import Directory from './src/screens/Directory'
import firebase from './src/firebase.js'
import AddNewTask from './src/screens/AddNewTask';
import CreateUser from './src/screens/CreateUser';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>
  },
  {
    path: "/home",
    element: <div><Header/><HomePage/></div>
  },
  {
    path: "/directory",
    element: <div><Header/><Directory/></div>
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

