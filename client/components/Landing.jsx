import React from 'react';
import { Link } from 'react-router';

import { About } from './SimpleContent';
import Projects from './Projects';
import BlogList from './BlogList';
import Photography from './Photography';

class Landing extends React.Component {
    render() {
        return <div id="Landing">
            <About id="About" limit={true} />
            <Projects id="Projects" limit={true} />
            <BlogList id="Blog" limit={true} />
            <Photography id="Photography" limit={true} />
        </div>
    }
}

export default Landing;