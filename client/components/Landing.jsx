import React from 'react';
import { Link } from 'react-router';

import { About, Projects } from './SimpleContent';
import BlogList from './BlogList';

class Landing extends React.Component {
    render() {
        return <div id="Landing">
            <About id="About" limit={true} />
            <Projects id="Projects" limit={true} />
            <BlogList id="Blog" limit={true} /> 
        </div>
    }
}

export default Landing;