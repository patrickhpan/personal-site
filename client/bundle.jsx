import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, browserHistory } from 'react-router';

import routes from './routes';
import './style/master.scss';

let history = process.env.NODE_ENV === 'production' ?
    browserHistory :
    hashHistory;

let router = <Router 
    children={routes}
    history={history}
/>

ReactDOM.render(router, document.getElementById("app-root"))