import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';

import keyify from '../js/keyify';

class Content extends React.Component {
    render() {
        let limit = this.props.limit;
        let id = this.props.id;

        let { header, content, footer } = this.props.data;
        
        if(!isNaN(limit)) {
            content = [...content.slice(0, limit), footer]
        }
        let renderedContent = renderContent(content);

        return <div id={id} className="Portfolio">
            <h2>{header}</h2>
            {renderedContent}
        </div>
    }
}

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



export default Content;
export { renderContent, renderItem }