import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import IconImage from './Images/MT-Icon.png';

// let link = document.querySelector("link[rel*='icon']");
// link.href = `url(${IconImage})`;
// document.getElementsByTagName('head')[0].appendChild(link);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
