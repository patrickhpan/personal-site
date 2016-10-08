import React from 'react';
import Link from 'react-router';

import renderContent from '../js/renderContent'
import strings from '../json/Projects.json';

class Projects extends React.Component {
    render() {
        let limit = this.props.limit;
        let content = strings.content;
        if(!isNaN(limit)) {
            content = content.slice(0, limit);
        }
        let renderedContent = renderContent(content);

        return <div id="Projects" className="Portfolio">
            <h2>{strings.header}</h2>
            {renderedContent}
        </div>
    }
}

export default Projects;