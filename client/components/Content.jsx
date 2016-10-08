import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';

import keyify from './keyify';

function renderItem(item) {
    let md = item.md;
    let link = item.link;

    let renderedMD = {
        __html: marked(md)
    };

    if(link) {
        if(/^h/.test(link)) {
            return <a 
                href={link}
                className="content-md"
                dangerouslySetInnerHTML={renderedMD}
            />
        } else {
            return <Link 
                to={link}
                className="content-md"
                dangerouslySetInnerHTML={renderedMD}
            />
        }
    }
    return <div
        className="content-md" 
        dangerouslySetInnerHTML={renderedMD}
    />;
}

function renderContent(content, wrap = true) {
    if(wrap) {
        return <div
            className="content-container"
        >
            {keyify(content.map(renderItem))}
        </div> 
    }
    return keyify(content.map(renderItem));
}

export default renderContent;