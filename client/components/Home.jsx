import React from 'react';

import About from './About';
import Projects from './PostLists/Projects';
import BlogPosts from './PostLists/BlogPosts';
import Photography from './Photography';

class Home extends React.Component {
    render() {
        return <div id="Home">
            <About limit={true} />
            <Projects limit={true} />
            <BlogPosts limit={true} />
            <Photography limit={true} />
        </div>
    }
}

export default Home;