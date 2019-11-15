import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);

serviceWorker.unregister();