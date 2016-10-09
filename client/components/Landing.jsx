import React from 'react';
import { Link } from 'react-router';

import { About, Projects } from './SimpleContent';
import BlogList from './BlogList';

class Landing extends React.Component {
    render() {
        return <div id="Landing">
            <About limit={2} />
            <Projects limit={4} />
            <BlogList limit={2} /> 
        </div>
    }
}

export default Landing;