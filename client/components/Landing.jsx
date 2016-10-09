import React from 'react';
import { Link } from 'react-router';

import { About, Projects } from './SimpleContent';
import BlogList from './BlogList';

class Landing extends React.Component {
    render() {
        return <div id="Landing">
            <About id="About" limit={2} />
            <Projects id="Projects" limit={4} />
            <BlogList id="Blog" limit={2} /> 
        </div>
    }
}

export default Landing;