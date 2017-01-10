import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Landing from './components/Landing';
import About from './components/About'
import Projects from './components/Projects';
import PostList from './components/PostList';
import Post from './components/Post';
import Photography from './components/Photography';

let routes = <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="/about" component={About} />
    <Route path="/projects" component={Projects} />
    <Route path="/posts" component={PostList} />
    <Route path="/posts/tag/:tag" component={PostList} />
    <Route path="/posts/post/:slug" component={Post} />
    <Route path="/photography" component={Photography} />
</Route>

export default routes;