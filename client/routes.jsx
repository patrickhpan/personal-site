import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HelloWorld from './components/HelloWorld';
import About from './components/About';

let routes = <Route path="/" component={App}>
    <IndexRoute component={HelloWorld} />
    <Route path="/about" component={About} />
</Route>

export default routes;