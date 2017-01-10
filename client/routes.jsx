import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Landing from './components/Landing';
import About from './components/About'
import AllPosts from './components/PostLists/AllPosts'
import BlogPosts from './components/PostLists/BlogPosts';
import PostsByTag from './components/PostLists/PostsByTag'
import Projects from './components/PostLists/Projects';
import Post from './components/Post';
import Photography from './components/Photography';

let routes = <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="/about" component={About} />
    <Route path="/projects" component={Projects} />
    <Route path="/posts" component={AllPosts} />
    <Route path="/posts/tag/:tag" component={PostsByTag} />
    <Route path="/posts/post/:slug" component={Post} />
    <Route path="/photography" component={Photography} />
</Route>

export default routes;