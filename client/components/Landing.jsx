import React from 'react';

import About from './About';
import Projects from './Projects';
import BlogList from './BlogList';
import Photography from './Photography';

class Landing extends React.Component {
    render() {
        return <div id="Landing">
            <About limit={true} />
            <Projects limit={true} />
            <BlogList limit={true} />
            <Photography limit={true} />
        </div>
    }
}

export default Landing;