import React from 'react';
import { Link } from 'react-router';

import { About, Projects } from './SimpleContent';

class Landing extends React.Component {
    render() {
        return <div id="Landing">
            <About limit={2} />
            <Projects limit={4} />
        </div>
    }
}

export default Landing;