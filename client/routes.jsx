import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Landing from './components/Landing';
import About from './components/About'
import Projects from './components/Projects';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import Photography from './components/Photography';

let routes = <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="/about" component={About} />
    <Route path="/projects" component={Projects} />
    <Route path="/blog" component={BlogList} />
    <Route path="/blog/:slug" component={BlogPost} />
    <Route path="/photography" component={Photography} />
</Route>

export default routes;