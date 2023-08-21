import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import LandingPage from './screens/LandingPage';
import HomePage from './screens/HomePage';
import Header from './models/header/Header.js'
import Directory from './screens/Directory'
import firebase from './firebase.js'
import AddNewTask from './screens/AddNewTask';
import CreateUser from './screens/CreateUser';
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

