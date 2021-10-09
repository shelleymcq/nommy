// BRING IN REACT MODULES
import React from 'react';
import ReactDOM from 'react-dom';

// BRING IN BOOTSTRAP AND STYLESHEET
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// BRING IN APP COMPONENT
import App from './App';

// WEB VITALS
import reportWebVitals from './reportWebVitals';

// RENDER REACT APP IN ROOT
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
