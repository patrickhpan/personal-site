import React from 'react';

import Gallery from './Gallery';
import { renderContent } from './_Content';

import staticContent from '../json/Photography.json';
import defaultFooter from '../json/SectionFooter.json';

class Photography extends React.Component {
    render() {
        let { header, footer, defaultLength } = staticContent;
        let limit = this.props.limit;

        if (limit === true) {
            limit = defaultLength;
        } else if (isNaN(limit)) {
            footer = defaultFooter;
        } else {
            limit = null;
        }

        let renderedFooter = renderContent([footer]); 
        return <div className="Portfolio">
            <h2 className="title">{header}</h2>
            <Gallery limit={limit}/>
            {renderedFooter}
        </div>
    }
}

export default Photography;