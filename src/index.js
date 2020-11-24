import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app.js';
import Amplify from 'aws-amplify';
import config from './config.js';


Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

