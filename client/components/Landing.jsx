import React from 'react';
import { Link } from 'react-router';

import Projects from './Projects';

import renderContent from './Content';
import strings from '../json/Landing.json';

class Landing extends React.Component {
    render() {
        let renderedContent = renderContent(strings.content)
        return <div id="Landing">
            {renderedContent}
            <Projects />
        </div>
    }
}

export default Landing;