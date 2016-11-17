import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import flatten from 'array-flatten';

import keyify from '../js/keyify';
import images from '../img/_images';
import defaultFooter from '../json/SectionFooter.json'

class Content extends React.Component {
    render() {
        // get the limit of markdown items and the link from props
        let { limit, id } = this.props;
        // get the default content
        let { header, content, footer, defaultLength } = this.props.data;
        
        if (limit === true) {
            // if trying to use default limit
            if (!isNaN(defaultLength)) {
                // if there is a default limit, use it
                content = content.slice(0, defaultLength)
            }
        } else if (!isNaN(limit)) {
            // if the limit is a number, use it
            content = content.slice(0, limit)
        } else {
            // if there is no limit, then we are not on the homepage
            // replace the footer with a "back to home" link
            footer = defaultFooter
        }
        
        let renderedContent = renderContent([...content, footer]);

        let href = `/${id}`

        return <div id={id} className="Portfolio">
            <Link to={href}>
                <h2 className="title">{header}</h2>
            </Link>
            {renderedContent}
        </div>
    }
}

function renderItem(item) {
    let { md, img, link } = item;

    // dangerouslySetInnerHTML object    
    let renderedMD = {
        __html: marked(md)
    };

    let toReturn = [];

    // if there is an image, render it before the content    
    if(img) {
        toReturn.push(<img
            className="content-img"
            src={images[item.img]} 
        />)
    }

    if (link) {
        if (/^\//.test(link)) {
            // if there is a relative link, use a react-router Link
            toReturn.push(<Link 
                to={link}
                className="content-md"
                dangerouslySetInnerHTML={renderedMD}
            />);
        } else {
            // if there is an absolute link, use a regular <a>
            toReturn.push(<a 
                href={link}
                className="content-md"
                dangerouslySetInnerHTML={renderedMD}
            />);
        }
    } else {
        // if there is no link, use a regular div
        toReturn.push(<div
            className="content-md" 
            dangerouslySetInnerHTML={renderedMD}
        />);
    }

    return toReturn;
}

function renderContent(content, wrap = true) {
    let renderedItems = flatten(content.map(renderItem));
    if(wrap) {
        return <div
            className="content-container"
        >
            {keyify(renderedItems)}
        </div> 
    }
    return renderedItems;
}

export default Content;
export { renderContent, renderItem }