import './styles/app.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store'; // Adjust the path
import Home from './components/home/Home'; // Adjust the path

export default function App() {
  return (
    <Provider store={store}>
      <h1>Student App with Redux Toolkit</h1>
      <Home />
    </Provider>
  );
}
