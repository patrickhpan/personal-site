import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Landing from './components/Landing';

let routes = <Route path="/" component={App}>
    <IndexRoute component={Landing} />
</Route>

export default routes;